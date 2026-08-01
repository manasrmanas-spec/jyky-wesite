// Firebase Config
import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// HTML Elements
const noticeForm = document.getElementById("noticeForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const date = document.getElementById("date");
const noticeTable = document.getElementById("noticeTable");
const saveNotice = document.getElementById("saveNotice");
let editNoticeId = null;
// Publish Notice
noticeForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        if (editNoticeId) {

            await updateDoc(doc(db, "notices", editNoticeId), {
                title: title.value.trim(),
                description: description.value.trim(),
                date: date.value
            });

            alert("Notice Updated Successfully!");

            editNoticeId = null;
            saveNotice.textContent = "Publish Notice";

        } else {

            await addDoc(collection(db, "notices"), {
                title: title.value.trim(),
                description: description.value.trim(),
                date: date.value,
                createdAt: serverTimestamp()
            });

            alert("Notice Published Successfully!");

        }

        noticeForm.reset();
        loadNotices();

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

});


// Load Notices
async function loadNotices() {

    noticeTable.innerHTML = "";

    const q = query(
        collection(db, "notices"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((docSnap) => {

        const notice = docSnap.data();

        noticeTable.innerHTML += `
            <tr>
                <td>${notice.title}</td>
                <td>${notice.date}</td>
                <td>
<button class="edit-btn" onclick="editNotice('${docSnap.id}','${notice.title}','${notice.description}','${notice.date}')">
✏️ Edit
</button>

<button class="delete-btn" onclick="deleteNotice('${docSnap.id}')">
🗑️ Delete
</button>
</td>
            </tr>
        `;

    });

}

loadNotices();
// ======================
// Edit Notice
// ======================

window.editNotice = function(id, noticeTitle, noticeDescription, noticeDate){

    editNoticeId = id;

    title.value = noticeTitle;
    description.value = noticeDescription;
    date.value = noticeDate;

    document.getElementById("saveNotice").textContent = "Update Notice";

};


// ======================
// Delete Notice
// ======================

window.deleteNotice = async function(id) {

    const confirmDelete = confirm("Are you sure you want to delete this notice?");

    if (!confirmDelete) return;

    try {

        await deleteDoc(doc(db, "notices", id));

        // Reset edit mode
        editNoticeId = null;
        noticeForm.reset();
        saveNotice.textContent = "Publish Notice";

        alert("Notice Deleted Successfully!");

        loadNotices();

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

};