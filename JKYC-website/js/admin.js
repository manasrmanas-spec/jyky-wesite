import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const table = document.getElementById("membersTable");
const totalMembers = document.getElementById("totalMembers");
const searchInput = document.getElementById("searchInput");
const pendingMembers = document.getElementById("pendingMembers");
const approvedMembers = document.getElementById("approvedMembers");

let members = [];

async function loadMembers() {

    table.innerHTML = "";

    const snapshot = await getDocs(collection(db, "members"));

    members = [];

    let pending = 0;
    let approved = 0;

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        if (data.status === "Pending") {
            pending++;

            members.push({
                id: docSnap.id,
                ...data
            });
        }

        if (data.status === "Approved") {
            approved++;
        }

    });

    totalMembers.innerText = pending + approved;
    pendingMembers.innerText = pending;
    approvedMembers.innerText = approved;

    displayMembers(members);

}

function displayMembers(data) {

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No Pending Members
                </td>
            </tr>
        `;
        return;

    }

    data.forEach(member => {

        table.innerHTML += `
        <tr>

            <td>${member.fullName || ""}</td>

            <td>${member.mobile || ""}</td>

            <td>${member.gender || ""}</td>

            <td>${member.occupation || ""}</td>

           <td>

    <button
        class="approve-btn"
        onclick="approveMember('${member.id}')">
        Approve
    </button>

    <a href="member-profile.html?id=${member.id}">
        <button class="view-btn">
            View
        </button>
    </a>

    <button
        class="delete-btn"
        onclick="deleteMember('${member.id}')">
        Delete
    </button>

<a href="edit-member.html?id=${member.id}">
    <button class="edit-btn">
        ✏️ Edit
    </button>
</a>

</td>

        </tr>
        `;

    });

}

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = members.filter(member =>
        (member.fullName || "").toLowerCase().includes(value)
    );

    displayMembers(filtered);

});

window.approveMember = async function(id){

    await updateDoc(doc(db,"members",id),{
        status:"Approved"
    });

    alert("Member Approved Successfully!");

    loadMembers();

}

window.deleteMember = async function(id){

    const ok = confirm("Delete this member?");

    if(!ok) return;

    await deleteDoc(doc(db,"members",id));

    alert("Member Deleted Successfully!");

    loadMembers();

}

loadMembers();