// ===============================
// JKYC Member ID Card
// member-id.js
// ===============================

import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Get Member ID from URL
const params = new URLSearchParams(window.location.search);
const memberDocId = params.get("id");

// HTML Elements
const name = document.getElementById("name");
const memberId = document.getElementById("memberId");
const mobile = document.getElementById("mobile");
const occupation = document.getElementById("occupation");
const bloodGroup = document.getElementById("bloodGroup");
const memberPhoto = document.getElementById("memberPhoto");
const qrCode = document.getElementById("qrcode");

// Load Member Data
async function loadMember() {

    if (!memberDocId) {
        alert("Member ID Not Found");
        return;
    }

    try {

        const memberRef = doc(db, "members", memberDocId);
        const memberSnap = await getDoc(memberRef);

        if (!memberSnap.exists()) {
            alert("Member Not Found");
            return;
        }

        const member = memberSnap.data();

        name.textContent = member.fullName || "N/A";
        memberId.textContent = member.memberId || "N/A";
        mobile.textContent = member.mobile || "N/A";
        occupation.textContent = member.occupation || "N/A";
        bloodGroup.textContent = member.bloodGroup || "N/A";

        memberPhoto.src =
            member.photoURL || "../images/default-user.png";

        // QR Code
        qrCode.innerHTML = "";

        new QRCode(qrCode, {
            text: window.location.href,
            width: 120,
            height: 120
        });

    } catch (error) {

        console.error(error);
        alert("Failed to Load Member Data");

    }

}

// Start
loadMember();

document.getElementById("downloadBtn").addEventListener("click", () => {

    const downloadBtn = document.getElementById("downloadBtn");
    const printBtn = document.getElementById("printBtn");

   

    // Wait for QR Code rendering
    setTimeout(() => {

        html2canvas(document.querySelector(".id-card"), {
            useCORS: true,
            allowTaint: false,
            backgroundColor: "#ffffff",
            scale: 3
        }).then(canvas => {

            const link = document.createElement("a");
            link.download = "JKYC-ID-Card.png";
            link.href = canvas.toDataURL("image/png");
            link.click();

        
        });

    }, 600);

});

// Print Button
document.getElementById("printBtn").addEventListener("click", () => {

    window.print();

});