// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQ8iXyIxgK-H7_00BcHHlJPs8KpcU1hCE",
    authDomain: "friendr-13d6c.firebaseapp.com",
    databaseURL: "https://friendr-13d6c-default-rtdb.firebaseio.com",
    projectId: "friendr-13d6c",
    storageBucket: "friendr-13d6c.appspot.com",
    messagingSenderId: "770859054230",
    appId: "1:770859054230:web:d792d2624b35c6d4e93eb7",
    measurementId: "G-PVSNCXGSB6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("submitBtn").addEventListener("click", () => {
    console.log("submit");
    let orgData = {
        "name": document.getElementById("org-name").value,
        "description": document.getElementById("org-desc").value,
        "pfp": document.getElementById("org-pfp").value,
        "email": document.getElementById("org-email").value,
        "room": document.getElementById("org-room").value,
        "discord": document.getElementById("org-discord").value,
        "insta": document.getElementById("org-insta").value,
        "website": document.getElementById("org-website").value,
        "interestLevels": {
            "Academic": document.getElementById("org-academics").value,
            "Arts": document.getElementById("org-arts").value,
            "Books": document.getElementById("org-books").value,
            "Games and Tech": document.getElementById("org-games-tech").value,
            "Music": document.getElementById("org-music").value,
            "Sports": document.getElementById("org-sports").value,
            "TV and Movies": document.getElementById("org-tv-movie").value,
        }
    }
    setDoc(doc(db, "organizations", document.getElementById("org-name").value), orgData);
});