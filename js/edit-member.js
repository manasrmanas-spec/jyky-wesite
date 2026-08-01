// ===============================
// JKYC Edit Member
// ===============================

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// URL Parameter
const params = new URLSearchParams(window.location.search);
const memberId = params.get("id");

// Form Elements
const fullName = document.getElementById("fullName");
const mobile = document.getElementById("mobile");
const gender = document.getElementById("gender");
const occupation = document.getElementById("occupation");
const bloodGroup = document.getElementById("bloodGroup");
const address = document.getElementById("address");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const photo = document.getElementById("photo");

const saveBtn = document.getElementById("saveBtn");

// ===============================
// Load Member
// ===============================

async function loadMember() {

    if (!memberId) {

        alert("Member ID Not Found");
        return;

    }

    try {

        const memberRef = doc(db, "members", memberId);

        const memberSnap = await getDoc(memberRef);

        if (!memberSnap.exists()) {

            alert("Member Not Found");
            return;

        }

        const member = memberSnap.data();

        fullName.value = member.fullName || "";
        mobile.value = member.mobile || "";
        gender.value = member.gender || "";
        occupation.value = member.occupation || "";
        bloodGroup.value = member.bloodGroup || "";
        address.value = member.address || "";
        email.value = member.email || "";
        dob.value = member.dob || "";
        photo.value = member.photo || "";

    } catch (error) {

        console.error(error);
        alert("Failed to Load Member");

    }

}

loadMember();
// ===============================
// Save Member
// ===============================

saveBtn.addEventListener("click", async () => {

    if (!memberId) return;

    // Validation
    if (
        fullName.value.trim() === "" ||
        mobile.value.trim() === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    saveBtn.disabled = true;
    saveBtn.innerHTML = "⏳ Saving...";

    try {

        await updateDoc(doc(db, "members", memberId), {

            fullName: fullName.value.trim(),
            mobile: mobile.value.trim(),
            gender: gender.value,
            occupation: occupation.value.trim(),
            bloodGroup: bloodGroup.value.trim(),
            address: address.value.trim(),
            email: email.value.trim(),
            dob: dob.value,
            photo: photo.value.trim()

        });

        alert("✅ Member Updated Successfully");

        window.location.href = "admin.html";

    } catch (error) {

        console.error(error);
        alert("❌ Failed to Update Member");

        saveBtn.disabled = false;
        saveBtn.innerHTML = "💾 Save Changes";

    }

});