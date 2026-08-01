import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const noticeList = document.getElementById("noticeList");
const searchInput = document.getElementById("searchNotice");

let allNotices = [];

async function loadNotices() {
    if (!noticeList) {
    console.log("noticeList element not found");
    return;
}

    noticeList.innerHTML = "";

    const q = query(
        collection(db, "notices"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        noticeList.innerHTML = "<h3>No Notices Available</h3>";
        return;
    }

    allNotices = [];

    snapshot.forEach((doc) => {
        allNotices.push(doc.data());
    });

    displayNotices(allNotices);
}

function displayNotices(notices) {

    noticeList.innerHTML = "";

    notices.forEach((notice, index) => {

        noticeList.innerHTML += `
        <div class="notice-card">

            ${index < 3 ? '<span class="new-badge">🆕 NEW</span>' : ""}

            <h2>${notice.title}</h2>

            <small>📅 ${notice.date}</small>

            <p>${notice.description}</p>

        </div>
        `;
    });

    if (notices.length === 0) {
        noticeList.innerHTML = "<h3>No matching notice found.</h3>";
    }
}

if (searchInput) {
    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        const filtered = allNotices.filter(notice =>
            notice.title.toLowerCase().includes(value) ||
            notice.description.toLowerCase().includes(value)
        );

        displayNotices(filtered);

    });
}

loadNotices();