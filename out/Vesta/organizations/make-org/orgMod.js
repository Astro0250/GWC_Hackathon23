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
    let orgData = fetchOrgInfo();

    setDoc(doc(db, "organizations", document.getElementById("org-name").value), orgData);
    document.getElementById("submitBtn").disabled = true;
    setTimeout(() => {
        window.location.href = "../organizations.html";
    }, 1000);
});

function fetchOrgInfo(){
    let orgData = {
        "name": "",
        "description": "",
        "email": "",
        "room": "",
        "discord": "",
        "insta": "",
        "website": "bths.edu",
        "interestLevels": {
            "Academic": 1,
            "Arts": 1,
            "Books": 1,
            "Games and Tech": 1,
            "Music": 1,
            "Sports": 1,
            "TV and Movies": 1,
        }
    };
    if (document.getElementById("org-name").value != ""){
        orgData["name"] = document.getElementById("org-name").value;
    }
    if (document.getElementById("org-desc").value != ""){
        orgData["description"] = document.getElementById("org-desc").value;
    }
    if (document.getElementById("org-email").value != ""){
        orgData["email"] = document.getElementById("org-email").value;
    }
    if (document.getElementById("org-room").value != ""){
        orgData["room"] = document.getElementById("org-room").value;
    }
    if (document.getElementById("org-discord").value != ""){
        orgData["discord"] = document.getElementById("org-discord").value;
    }
    if (document.getElementById("org-insta").value != ""){
        orgData["insta"] = document.getElementById("org-insta").value;
    }
    if (document.getElementById("org-website").value != ""){
        orgData["website"] = document.getElementById("org-website").value;
    }
    if (document.getElementById("org-academics").value != ""){
        orgData["interestLevels"]["Academic"] = parseFloat(document.getElementById("org-academics").value)/10;
    }
    if (document.getElementById("org-arts").value != ""){
        orgData["interestLevels"]["Arts"] = parseFloat(document.getElementById("org-arts").value)/10;
    }
    if (document.getElementById("org-books").value != ""){
        orgData["interestLevels"]["Books"] = parseFloat(document.getElementById("org-books").value)/10;
    }
    if (document.getElementById("org-games-tech").value != ""){
        orgData["interestLevels"]["Games and Tech"] = parseFloat(document.getElementById("org-games-tech").value)/10;
    }
    if (document.getElementById("org-music").value != ""){
        orgData["interestLevels"]["Music"] = parseFloat(document.getElementById("org-music").value)/10;
    }
    if (document.getElementById("org-sports").value != ""){
        orgData["interestLevels"]["Sports"] = parseFloat(document.getElementById("org-sports").value)/10;
    }
    if (document.getElementById("org-tv-movie").value != ""){
        orgData["interestLevels"]["TV and Movies"] = parseFloat(document.getElementById("org-tv-movie").value)/10;
    }
    return orgData;
}