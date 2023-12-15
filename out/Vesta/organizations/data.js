
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
const auth = getAuth();
let userID = sessionStorage.getItem("userID");
const orgs = [];

let currentUser = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    currentUser = user;
    //localStorage.set("userID", uid);
    accUsername.innerHTML = user.displayName;
    accPFP.src = user.photoURL;
    sessionStorage.setItem("userID", uid);
  } else {
    window.location.replace("../sign up/signup.html");
  }
});

document.getElementById("logoutBtn").addEventListener('click',(e) => {
    signOut(auth)
    .then(() => {
        window.location.replace("../sign up/signup.html");
    })
    .catch((error) => {
        console.log(error.message);
    });
});

async function getUsersOrganizations()
{
        const snapshot = await getDocs(collection(db, 'organizations'));
        snapshot.docs.forEach((doc) => {
          let div = document.getElementById("sample").cloneNode(true);
          div.setAttribute("class", "org");
          div.getElementsByClassName("org-content")[0].getElementsByClassName("org-name")[0].innerHTML = doc.data().name;
          div.getElementsByClassName("org-content")[0].getElementsByClassName("org-desc")[0].innerHTML = doc.data().description;
          document.getElementById("org-view").appendChild(div);
        });
}

getUsersOrganizations();