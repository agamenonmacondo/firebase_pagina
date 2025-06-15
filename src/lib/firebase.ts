// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getAnalytics, type Analytics } from "firebase/analytics"; // Added Analytics import

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG3zDJIUKPYSC5E6z7_6cK2pvcudUd0I8",
  authDomain: "ava-agente.firebaseapp.com",
  projectId: "ava-agente",
  storageBucket: "ava-agente.appspot.com", // Corrected storageBucket domain
  messagingSenderId: "745753829503",
  appId: "1:745753829503:web:7c79680afd23a913d05f4a",
  measurementId: "G-0RYS0VYE3D"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null; // Initialize analytics as null

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  // Check if window is defined (i.e., we are on the client side) before initializing Analytics
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} else {
  app = getApps()[0];
  // If app is already initialized, try to get analytics instance (only on client)
  if (typeof window !== 'undefined') {
    try {
        analytics = getAnalytics(app);
    } catch (e) {
        console.warn("Could not get Analytics instance, likely already initialized or running on server.", e)
    }
  }
}

const auth: Auth = getAuth(app);

export { app, auth, analytics };
