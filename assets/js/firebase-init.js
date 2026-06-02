import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

export const firebaseConfig = {
    apiKey: "AIzaSyDcM6UIpnx0lUmCMZ9FQba9xrhoqOa5da0",
    authDomain: "budgeting-planner.firebaseapp.com",
    projectId: "budgeting-planner",
    storageBucket: "budgeting-planner.firebasestorage.app",
    messagingSenderId: "391737769160",
    appId: "1:391737769160:web:118a765461469615f579fd",
    measurementId: "G-SKPHPZNNSV"
};

export const app = initializeApp(firebaseConfig);
const firebaseState = {
    app,
    analytics: null,
    config: firebaseConfig
};

window.BudgetAppFirebase = firebaseState;

const isLocalhost = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);

export const analyticsReady = (!isLocalhost ? isSupported() : Promise.resolve(false))
    .then((supported) => {
        if (!supported) return null;
        firebaseState.analytics = getAnalytics(app);
        return firebaseState.analytics;
    })
    .catch(() => null);