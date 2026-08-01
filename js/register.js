import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    doc,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();
    try {

        // Generate Unique Member ID
        const counterRef = doc(db, "counters", "members");

        const memberId = await runTransaction(db, async (transaction) => {

            const counterDoc = await transaction.get(counterRef);

            if (!counterDoc.exists()) {
                throw new Error("Counter document not found.");
            }

            const lastId = counterDoc.data().lastId || 0;

            const newId = lastId + 1;

            transaction.update(counterRef, {
                lastId: newId
            });

            return "JKYC" + String(newId).padStart(4, "0");

        });

       const photoFile = document.getElementById("photo").files[0];

let photoURL = "";

if (photoFile) {

    const formData = new FormData();

    formData.append("file", photoFile);
    formData.append("upload_preset", "jkyc_upload");

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/fcdkrkh4/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    photoURL = data.secure_url;
}

        // Member Data
        const member = {

            memberId,
            photoURL,
            
            fullName: document.getElementById("fullName").value.trim(),
            fatherName: document.getElementById("fatherName").value.trim(),
            dob: document.getElementById("dob").value,
            gender: document.getElementById("gender").value,
            mobile: document.getElementById("mobile").value.trim(),
            email: document.getElementById("email").value.trim(),
            address: document.getElementById("address").value.trim(),
            bloodGroup: document.getElementById("bloodGroup").value,
            occupation: document.getElementById("occupation").value.trim(),
            aadhaar: document.getElementById("aadhaar").value.trim(),

            status: "Pending",
            createdAt: serverTimestamp()

        };

        await addDoc(collection(db, "members"), member);

        alert(`Registration Successful!

Member ID: ${memberId}

Your request is pending approval.`);

        form.reset();

    } catch (error) {

        console.error(error);
        alert("Registration Failed: " + error.message);

    }

});