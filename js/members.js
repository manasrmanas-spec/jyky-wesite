import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const membersContainer = document.getElementById("membersContainer");
const searchBox = document.getElementById("searchBox");

let allMembers = [];

async function loadMembers() {

    membersContainer.innerHTML = "<h3>Loading Members...</h3>";

    try {

        const querySnapshot = await getDocs(collection(db, "members"));

        console.log("Total Members:", querySnapshot.size);

        allMembers = [];

        querySnapshot.forEach((doc) => {

            console.log(doc.id, doc.data());

            const member = doc.data();

            if (member.status === "Approved") {

                allMembers.push({
                    id: doc.id,
                    ...member
                });

            }

        });

        displayMembers(allMembers);

    } catch (error) {

        console.error("Firestore Error:", error);

        membersContainer.innerHTML =
            "<h3>Failed to load members.</h3>";

    }

}

function displayMembers(members) {

    membersContainer.innerHTML = "";

    if (members.length === 0) {

        membersContainer.innerHTML =
            "<h3>No Approved Members Found.</h3>";

        return;

    }

    members.forEach(member => {

        membersContainer.innerHTML += `

        <div class="member-card">

            <img src="${member.photoURL || "../images/default-user.png"}"
                 alt="Member">

            <h3>${member.fullName || "No Name"}</h3>

            <p>${member.occupation || "Member"}</p>

            <p>Mobile : ${member.mobile || "Not Available"}</p>

            <a href="member-profile.html?id=${member.id}" class="btn">
                View Profile
            </a>
            <a href="member-id.html?id=${member.id}" class="btn btn-id">
    🪪 ID Card
</a>

        </div>

        `;

    });

}

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const filtered = allMembers.filter(member =>
            (member.fullName || "")
            .toLowerCase()
            .includes(value)
        );

        displayMembers(filtered);

    });

}

function filterMembers(role) {

    if (role === "all") {

        displayMembers(allMembers);

        return;

    }

    const filtered = allMembers.filter(member =>
        (member.occupation || "")
        .toLowerCase() === role.toLowerCase()
    );

    displayMembers(filtered);

}

window.filterMembers = filterMembers;

loadMembers();