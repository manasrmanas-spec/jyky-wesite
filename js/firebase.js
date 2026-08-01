// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzwjhY03wJGsIP5EK0IkiQFDBDmn4h-Xw",
  authDomain: "jkyc-website.firebaseapp.com",
  projectId: "jkyc-website",
  storageBucket: "jkyc-website.firebasestorage.app",
  messagingSenderId: "61400137792",
  appId: "1:61400137792:web:58e6c50ce347ac3e5a5fa5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Firestore
const db = getFirestore(app);


// Storage
const storage = getStorage(app);


// Authentication
const auth = getAuth(app);


// Export
export { db, storage, auth };