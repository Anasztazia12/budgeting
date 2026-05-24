// Delete Account Feature (modular, no frameworks)
import { deleteCurrentAccount } from "./firebase-service.js";

// Utility: check if guest mode (no Firebase Auth user)
export function checkGuestMode(currentUser, GUEST_SESSION_VALUE) {
  return !currentUser || currentUser === GUEST_SESSION_VALUE;
}

// Show guest modal
export function showGuestModal() {
  const modal = document.getElementById("guest-account-modal");
  modal.classList.remove("hidden");
  modal.classList.add("active");
  modal.querySelector("#guest-modal-close-btn").onclick = () => {
    modal.classList.remove("active");
    setTimeout(() => modal.classList.add("hidden"), 200);
  };
}

// Show delete confirmation modal
export function showDeleteModal(onConfirm, onCancel) {
  const modal = document.getElementById("delete-account-modal");
  const msg = document.getElementById("delete-account-modal-message");
  const actions = document.getElementById("delete-account-modal-actions");
  msg.textContent = "Are you sure you want to delete your account? This action is permanent.";
  actions.innerHTML = "";
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "cancel";
  cancelBtn.onclick = () => {
    modal.classList.remove("active");
    setTimeout(() => modal.classList.add("hidden"), 200);
    if (onCancel) onCancel();
  };
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => {
    modal.classList.remove("active");
    setTimeout(() => modal.classList.add("hidden"), 200);
    if (onConfirm) onConfirm();
  };
  actions.appendChild(cancelBtn);
  actions.appendChild(deleteBtn);
  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("active"), 10);
}

// Delete user Firestore doc and Auth account
export async function deleteUserData() {
  await deleteCurrentAccount();
}

// Send confirmation email (via Firebase Functions REST endpoint or email service)
export async function sendConfirmationEmail(email) {
  // This is a placeholder. In production, use a backend function or email API.
  // Example: fetch('/send-confirmation-email', { method: 'POST', body: JSON.stringify({ email }) })
  return Promise.resolve();
}

// Delete Firebase Auth user (already handled in deleteCurrentAccount)
export async function deleteAuthAccount() {
  // No-op: handled in deleteCurrentAccount
  return Promise.resolve();
}

// Show toast
export function showDeleteToast(msg) {
  const toast = document.getElementById("delete-toast");
  toast.textContent = msg;
  toast.classList.add("active");
  setTimeout(() => toast.classList.remove("active"), 3500);
}
