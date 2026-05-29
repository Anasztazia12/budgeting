import {
    EmailAuthProvider,
    browserLocalPersistence,
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    onAuthStateChanged,
    reauthenticateWithCredential,
    setPersistence,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
    verifyPasswordResetCode
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import {
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    query,
    runTransaction,
    setDoc,
    where
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import { app } from "./firebase-init.js";

const auth = getAuth(app);
const db = getFirestore(app);

const persistenceReady = setPersistence(auth, browserLocalPersistence).catch(() => null);

let authReadyResolved = false;
let authReadyResolver = null;
const authReady = new Promise((resolve) => {
    authReadyResolver = resolve;
});

onAuthStateChanged(auth, () => {
    if (authReadyResolved) {
        return;
    }

    authReadyResolved = true;
    if (authReadyResolver) {
        authReadyResolver();
        authReadyResolver = null;
    }
});

function normalizeEntriesData(data) {
    return {
        incomes: Array.isArray(data && data.incomes) ? data.incomes : [],
        expenses: Array.isArray(data && data.expenses) ? data.expenses : []
    };
}

function normalizeUsername(username) {
    return String(username || "").trim().toLowerCase();
}

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function normalizeProfile(profile, user) {
    const username = String(
        profile?.username || profile?.nickname || user?.displayName || user?.email || ""
    ).trim();

    return {
        username,
        nickname: String(profile?.nickname || username).trim(),
        email: String(profile?.email || user?.email || "").trim(),
        normalizedUsername: normalizeUsername(profile?.normalizedUsername || username),
        registeredAt: String(profile?.registeredAt || new Date().toISOString())
    };
}

function createAppError(code, cause) {
    const error = new Error(code);
    error.code = code;
    if (cause) {
        error.cause = cause;
    }
    return error;
}

async function hashPassword(password) {
    if (!globalThis.crypto?.subtle) {
        throw createAppError("app/crypto-unavailable");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(String(password || ""));
    const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function findUserUidByEmail(email) {
    const cleanEmail = normalizeEmail(email);
    if (!cleanEmail) {
        return "";
    }

    const usersQuery = query(
        collection(db, "users"),
        where("profile.email", "==", cleanEmail),
        limit(1)
    );
    const usersSnapshot = await getDocs(usersQuery);
    if (usersSnapshot.empty) {
        return "";
    }

    return String(usersSnapshot.docs[0].id || "");
}

async function findUsernameByEmail(email) {
    const cleanEmail = normalizeEmail(email);
    if (!cleanEmail) {
        return "";
    }

    const usernameQuery = query(
        collection(db, "usernames"),
        where("email", "==", cleanEmail),
        limit(1)
    );
    const usernameSnapshot = await getDocs(usernameQuery);
    if (usernameSnapshot.empty) {
        return "";
    }

    const mapping = usernameSnapshot.docs[0].data() || {};
    return String(mapping.username || "").trim();
}

async function readPasswordHistory(uid) {
    const cleanUid = String(uid || "").trim();
    if (!cleanUid) {
        return [];
    }

    const snapshot = await getDoc(doc(db, "users", cleanUid));
    if (!snapshot.exists()) {
        return [];
    }

    const previousPasswords = snapshot.data()?.previousPasswords;
    return Array.isArray(previousPasswords) ? previousPasswords : [];
}

async function appendPasswordToHistory(uid, password) {
    const cleanUid = String(uid || "").trim();
    if (!cleanUid || !password) {
        return;
    }

    const hash = await hashPassword(password);
    await setDoc(
        doc(db, "users", cleanUid),
        {
            previousPasswords: arrayUnion(hash),
            updatedAt: new Date().toISOString()
        },
        { merge: true }
    );
}

async function ensurePasswordNotReused(uid, candidatePassword) {
    const cleanUid = String(uid || "").trim();
    if (!cleanUid || !candidatePassword) {
        return;
    }

    const candidateHash = await hashPassword(candidatePassword);
    const previousPasswords = await readPasswordHistory(cleanUid);
    if (previousPasswords.includes(candidateHash)) {
        throw createAppError("app/password-reused");
    }
}

async function ensureAuthReady() {
    await persistenceReady;
    await authReady;
}

async function getUserRecordByUid(uid) {
    if (!uid) {
        return {
            profile: null,
            data: normalizeEntriesData(null)
        };
    }

    const snapshot = await getDoc(doc(db, "users", uid));
    if (!snapshot.exists()) {
        return {
            profile: null,
            data: normalizeEntriesData(null)
        };
    }

    const payload = snapshot.data() || {};
    return {
        profile: payload.profile || null,
        data: normalizeEntriesData(payload.data)
    };
}

async function ensureUserDocument(user, profileOverride) {
    const existing = await getUserRecordByUid(user.uid);
    const profile = normalizeProfile(profileOverride || existing.profile, user);
    const data = normalizeEntriesData(existing.data);

    await setDoc(
        doc(db, "users", user.uid),
        {
            profile,
            data,
            updatedAt: new Date().toISOString()
        },
        { merge: true }
    );

    if (profile.normalizedUsername) {
        await setDoc(
            doc(db, "usernames", profile.normalizedUsername),
            {
                uid: user.uid,
                username: profile.username,
                email: profile.email,
                normalizedUsername: profile.normalizedUsername,
                updatedAt: new Date().toISOString()
            },
            { merge: true }
        );
    }

    return {
        profile,
        data
    };
}

async function getCurrentSession() {
    await ensureAuthReady();

    const user = auth.currentUser;
    if (!user) {
        return null;
    }

    const existing = await ensureUserDocument(user);
    return {
        uid: user.uid,
        email: user.email || existing.profile?.email || "",
        profile: existing.profile,
        data: normalizeEntriesData(existing.data)
    };
}

export async function restoreSession(expectedUsername) {
    const session = await getCurrentSession();
    if (!session) {
        return null;
    }

    const actualUsername = String(session.profile?.username || "").trim();
    if (expectedUsername && actualUsername && expectedUsername !== actualUsername) {
        return null;
    }

    return session;
}

export async function registerWithUsername({ username, email, password }) {
    const cleanUsername = String(username || "").trim();
    const cleanEmail = normalizeEmail(email);
    const normalizedUsername = normalizeUsername(cleanUsername);

    if (!cleanUsername || !cleanEmail || !password) {
        throw createAppError("app/invalid-registration");
    }

    try {
        const emailQuery = query(
            collection(db, "usernames"),
            where("email", "==", cleanEmail),
            limit(1)
        );
        const emailSnap = await getDocs(emailQuery);
        if (!emailSnap.empty) {
            throw createAppError("app/email-already-exists");
        }
    } catch (error) {
        if (error?.code === "app/email-already-exists") {
            throw error;
        }
        // If email lookup is blocked by rules, continue and rely on Firebase Auth duplicate email check.
    }

    let credential = null;

    try {
        credential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        await updateProfile(credential.user, { displayName: cleanUsername });

        await runTransaction(db, async (transaction) => {
            const usernameRef = doc(db, "usernames", normalizedUsername);
            const usernameSnap = await transaction.get(usernameRef);
            if (usernameSnap.exists()) {
                throw createAppError("app/username-taken");
            }

            const profile = {
                username: cleanUsername,
                nickname: cleanUsername,
                email: cleanEmail,
                normalizedUsername,
                registeredAt: new Date().toISOString()
            };

            transaction.set(usernameRef, {
                uid: credential.user.uid,
                username: cleanUsername,
                email: cleanEmail,
                normalizedUsername,
                createdAt: new Date().toISOString()
            });

            transaction.set(doc(db, "users", credential.user.uid), {
                profile,
                data: normalizeEntriesData(null),
                previousPasswords: [await hashPassword(password)],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        });

        return getCurrentSession();
    } catch (error) {
        if (credential?.user) {
            try {
                await deleteUser(credential.user);
            } catch (_cleanupError) {
                await signOut(auth).catch(() => null);
            }
        }
        throw error;
    }
}

export async function loginWithUsername({ username, password }) {
    const normalizedUsername = normalizeUsername(username);
    if (!normalizedUsername || !password) {
        throw createAppError("app/invalid-login");
    }

    const usernameSnap = await getDoc(doc(db, "usernames", normalizedUsername));
    if (!usernameSnap.exists()) {
        throw createAppError("app/invalid-login");
    }

    const mapping = usernameSnap.data() || {};
    const email = String(mapping.email || "").trim();
    if (!email) {
        throw createAppError("app/invalid-login");
    }

    await signInWithEmailAndPassword(auth, email, password);
    return getCurrentSession();
}

export async function requestPasswordReset(identifier) {
    const cleanIdentifier = String(identifier || "").trim();
    if (!cleanIdentifier) {
        throw createAppError("app/invalid-reset-request");
    }

    let email = normalizeEmail(cleanIdentifier);
    let username = "";
    if (!cleanIdentifier.includes("@")) {
        const normalizedUsername = normalizeUsername(cleanIdentifier);
        const usernameSnap = await getDoc(doc(db, "usernames", normalizedUsername));
        if (!usernameSnap.exists()) {
            throw createAppError("app/invalid-reset-request");
        }

        const mapping = usernameSnap.data() || {};
        email = normalizeEmail(mapping.email);
        username = String(mapping.username || cleanIdentifier).trim();
        if (!email) {
            throw createAppError("app/invalid-reset-request");
        }
    } else {
        username = await findUsernameByEmail(email);
    }

    const continueUrl = `https://anasztazia12.github.io/budgeting/`;
    await sendPasswordResetEmail(auth, email, {
        url: continueUrl
    });

    return {
        email,
        username
    };
}

export async function changeCurrentUserPassword({ currentPassword, newPassword }) {
    await ensureAuthReady();

    const user = auth.currentUser;
    if (!user) {
        throw createAppError("app/not-authenticated");
    }

    if (!newPassword) {
        throw createAppError("app/invalid-password-change");
    }

    await ensurePasswordNotReused(user.uid, newPassword);

    const cleanCurrentPassword = String(currentPassword || "");
    if (!cleanCurrentPassword || !user.email) {
        throw createAppError("app/requires-current-password");
    }

    const credential = EmailAuthProvider.credential(user.email, cleanCurrentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    await appendPasswordToHistory(user.uid, newPassword);
}

export async function completePasswordResetWithHistory({ oobCode, newPassword }) {
    const cleanCode = String(oobCode || "").trim();
    if (!cleanCode || !newPassword) {
        throw createAppError("app/invalid-password-reset");
    }

    const email = await verifyPasswordResetCode(auth, cleanCode);
    const uid = await findUserUidByEmail(email);
    if (uid) {
        await ensurePasswordNotReused(uid, newPassword);
    }

    await confirmPasswordReset(auth, cleanCode, newPassword);

    if (uid) {
        await appendPasswordToHistory(uid, newPassword);
    }

    return { email };
}

export async function changeCurrentUsername({ newUsername }) {
    await ensureAuthReady();

    const user = auth.currentUser;
    if (!user) throw createAppError("app/not-authenticated");

    const cleanNew = String(newUsername || "").trim();
    if (!cleanNew) throw createAppError("app/invalid-username-change");

    const newNormalized = normalizeUsername(cleanNew);

    const snapshot = await getDoc(doc(db, "users", user.uid));
    if (!snapshot.exists()) throw createAppError("app/not-authenticated");

    const payload = snapshot.data() || {};
    const oldNormalized = normalizeUsername(payload.profile?.username || "");

    if (newNormalized === oldNormalized) throw createAppError("app/username-same");

    const email = String(payload.profile?.email || user.email || "").trim();

    await runTransaction(db, async (transaction) => {
        const newUsernameRef = doc(db, "usernames", newNormalized);
        const checkSnap = await transaction.get(newUsernameRef);
        if (checkSnap.exists()) throw createAppError("app/username-taken");

        const newProfile = {
            ...(payload.profile || {}),
            username: cleanNew,
            nickname: cleanNew,
            normalizedUsername: newNormalized
        };

        transaction.set(doc(db, "users", user.uid), { profile: newProfile, updatedAt: new Date().toISOString() }, { merge: true });
        transaction.set(newUsernameRef, { uid: user.uid, username: cleanNew, email, normalizedUsername: newNormalized, updatedAt: new Date().toISOString() });

        if (oldNormalized && oldNormalized !== newNormalized) {
            transaction.delete(doc(db, "usernames", oldNormalized));
        }
    });

    await updateProfile(user, { displayName: cleanNew });
    return getCurrentSession();
}

export async function logoutCurrentUser() {
    await signOut(auth);
}

export async function loadCurrentUserData() {
    const session = await getCurrentSession();
    return session ? normalizeEntriesData(session.data) : normalizeEntriesData(null);
}

export async function saveCurrentUserData(data) {
    const session = await getCurrentSession();
    if (!session) {
        throw createAppError("app/not-authenticated");
    }

    const normalizedData = normalizeEntriesData(data);
    await setDoc(
        doc(db, "users", session.uid),
        {
            data: normalizedData,
            updatedAt: new Date().toISOString()
        },
        { merge: true }
    );

    return normalizedData;
}

export async function deleteCurrentAccount() {
    const session = await getCurrentSession();
    if (!session) {
        throw createAppError("app/not-authenticated");
    }

    const user = auth.currentUser;
    const usernameKey = normalizeUsername(session.profile?.username);
    const userRef = doc(db, "users", session.uid);
    const usernameRef = usernameKey ? doc(db, "usernames", usernameKey) : null;

    const userSnapshot = await getDoc(userRef);
    const userBackup = userSnapshot.exists() ? userSnapshot.data() : null;
    let usernameBackup = null;

    if (usernameRef) {
        const usernameSnapshot = await getDoc(usernameRef);
        usernameBackup = usernameSnapshot.exists() ? usernameSnapshot.data() : null;
    }

    await deleteDoc(userRef).catch(() => null);
    if (usernameRef) {
        await deleteDoc(usernameRef).catch(() => null);
    }

    try {
        await deleteUser(user);
    } catch (error) {
        if (userBackup) {
            await setDoc(userRef, userBackup).catch(() => null);
        }
        if (usernameRef && usernameBackup) {
            await setDoc(usernameRef, usernameBackup).catch(() => null);
        }
        throw error;
    }
}

export function getAuthErrorCode(error) {
    return String(error?.code || "app/unknown");
}

export function getFirebaseErrorMessage(error, language, operation) {
    const locale = language === "en" ? "en" : "hu";
    const code = getAuthErrorCode(error);
    const scope = operation || "generic";

    const fallback = {
        en: {
            generic: "Firebase request failed.",
            login: "Sign in failed.",
            register: "Registration failed.",
            reset: "Password reset request failed.",
            save: "Saving to Firebase failed.",
            delete: "Account deletion failed.",
            load: "Loading data from Firebase failed."
        },
        hu: {
            generic: "A Firebase kérés nem sikerült.",
            login: "A bejelentkezés nem sikerült.",
            register: "A regisztráció nem sikerült.",
            reset: "A jelszó-visszaállítási kérés nem sikerült.",
            save: "A Firebase mentés nem sikerült.",
            delete: "A fiók törlése nem sikerült.",
            load: "A Firebase adatbetöltés nem sikerült."
        }
    };

    const messageMap = {
        "app/username-taken": {
            en: "This nickname is already taken.",
            hu: "Ez a becenév már foglalt."
        },
        "app/username-same": {
            en: "This is already your current nickname.",
            hu: "Ez már a jelenlegi beceneved."
        },
        "app/invalid-username-change": {
            en: "Please enter a valid nickname.",
            hu: "Adj meg egy érvényes becenevet."
        },
        "app/email-already-exists": {
            en: "This email address is already registered.",
            hu: "Ez az email cím már regisztrálva van!"
        },
        "app/not-authenticated": {
            en: "You are not signed in.",
            hu: "Nem vagy bejelentkezve."
        },
        "app/invalid-registration": {
            en: "Registration data is incomplete.",
            hu: "A regisztrációs adatok hiányosak."
        },
        "app/invalid-login": {
            en: "Invalid nickname or password.",
            hu: "Hibás becenév vagy jelszó."
        },
        "app/invalid-reset-request": {
            en: "Please enter a valid nickname or email address.",
            hu: "Adj meg egy érvényes becenevet vagy email címet."
        },
        "app/invalid-password-change": {
            en: "Please enter a valid new password.",
            hu: "Adj meg egy érvényes új jelszót."
        },
        "app/requires-current-password": {
            en: "Please enter your current password first.",
            hu: "Először add meg a jelenlegi jelszavadat."
        },
        "app/invalid-password-reset": {
            en: "The password reset link is invalid.",
            hu: "A jelszó-visszaállítási link érvénytelen."
        },
        "app/password-reused": {
            en: "This password was already used earlier. Please choose a different one.",
            hu: "Ez a jelszó korábban már használt volt, válassz másikat."
        },
        "app/crypto-unavailable": {
            en: "Secure password check is not available in this browser.",
            hu: "A biztonságos jelszóellenőrzés ebben a böngészőben nem érhető el."
        },
        "auth/email-already-in-use": {
            en: "This email address is already in use.",
            hu: "Ez az email cím már használatban van."
        },
        "auth/weak-password": {
            en: "The password is too weak.",
            hu: "A jelszó túl gyenge."
        },
        "auth/configuration-not-found": {
            en: "Firebase Email/Password sign-in is not enabled yet.",
            hu: "A Firebase Email/Password bejelentkezés még nincs bekapcsolva."
        },
        "auth/operation-not-allowed": {
            en: "Firebase Email/Password sign-in is not enabled yet.",
            hu: "A Firebase Email/Password bejelentkezés még nincs bekapcsolva."
        },
        "auth/invalid-credential": {
            en: "Invalid nickname or password.",
            hu: "Hibás becenév vagy jelszó."
        },
        "auth/invalid-login-credentials": {
            en: "Invalid nickname or password.",
            hu: "Hibás becenév vagy jelszó."
        },
        "auth/invalid-email": {
            en: "Please enter a valid email address.",
            hu: "Adj meg egy érvényes email címet."
        },
        "auth/user-not-found": {
            en: "Invalid nickname or password.",
            hu: "Hibás becenév vagy jelszó."
        },
        "auth/wrong-password": {
            en: "Invalid nickname or password.",
            hu: "Hibás becenév vagy jelszó."
        },
        "auth/requires-recent-login": {
            en: "Please sign in again, then try the action once more.",
            hu: "Jelentkezz be újra, és utána próbáld meg ismét."
        },
        "auth/network-request-failed": {
            en: "Network error while contacting Firebase.",
            hu: "Hálózati hiba történt a Firebase elérése közben."
        },
        "auth/invalid-action-code": {
            en: "The reset link is invalid or already used.",
            hu: "A visszaállító link érvénytelen vagy már felhasználták."
        },
        "auth/expired-action-code": {
            en: "The reset link has expired. Please request a new one.",
            hu: "A visszaállító link lejárt. Kérj új linket."
        },
        "permission-denied": {
            en: "Firestore permission denied. Check your Firebase rules.",
            hu: "A Firestore hozzáférést megtagadta. Ellenőrizd a Firebase rules beállítást."
        },
        "failed-precondition": {
            en: "Firebase is not fully configured yet.",
            hu: "A Firebase még nincs teljesen beállítva."
        },
        "unavailable": {
            en: "Firebase is temporarily unavailable.",
            hu: "A Firebase átmenetileg nem érhető el."
        }
    };

    return messageMap[code]?.[locale] || fallback[locale][scope] || fallback[locale].generic;
}

window.BudgetAppFirebaseService = {
    restoreSession,
    registerWithUsername,
    loginWithUsername,
    changeCurrentUserPassword,
    completePasswordResetWithHistory,
    logoutCurrentUser,
    loadCurrentUserData,
    saveCurrentUserData,
    deleteCurrentAccount,
    getAuthErrorCode,
    getFirebaseErrorMessage
};