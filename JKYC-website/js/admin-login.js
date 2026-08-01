// ===============================
// JKYC Admin Login
// admin-login.js
// ===============================

import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// ===============================
// HTML Elements
// ===============================

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");

const showPassword = document.getElementById("showPassword");

// ===============================
// Already Logged In
// ===============================

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "admin.html";

    }

});

// ===============================
// Show / Hide Password
// ===============================

showPassword.addEventListener("change", () => {

    password.type = showPassword.checked
        ? "text"
        : "password";

});
// ===============================
// Login Form Submit
// ===============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const userEmail = email.value.trim();
    const userPassword = password.value;

    if (!userEmail || !userPassword) {

        alert("Please enter email and password.");
        return;

    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = "⏳ Logging in...";

    try {

        await signInWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
        );

        alert("✅ Login Successful");

        window.location.href = "admin.html";

    } catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/invalid-credential":
            case "auth/wrong-password":
            case "auth/user-not-found":
                alert("❌ Invalid email or password.");
                break;

            case "auth/invalid-email":
                alert("❌ Invalid email address.");
                break;

            case "auth/too-many-requests":
                alert("❌ Too many attempts. Try again later.");
                break;

            default:
                alert("❌ Login failed. Please try again.");
        }

        loginBtn.disabled = false;
        loginBtn.innerHTML = "🔐 Login";

    }

});