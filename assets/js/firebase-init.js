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

export const analyticsReady = isSupported()
    .then((supported) => {
        if (!supported) {
            return null;
        }

        firebaseState.analytics = getAnalytics(app);
        return firebaseState.analytics;
    })
    .catch(() => {
        // Analytics support depends on the browser environment.
        return null;
    });