
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
const userID = sessionStorage.getItem("userID"); 

const users = new Map();

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

document.getElementById("logoutBtn").addEventListener('click', (e) => {
  signOut(auth)
    .then(() => {
      window.location.replace("../sign up/signup.html");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// document.getElementsByClassName("friend").forEach((element) => {
//   element.addEventListener('click', (e) => {
//     postOverlay.style.display = "block";
//     console.log("rah");
//   });
// });

async function getAllUsers()
{
    try {
        const snapshot = await getDocs(collection(db, 'users'));

        snapshot.docs.forEach(doc => {
            users.set(doc.id, doc.data());
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function addUsers()
{
    await getAllUsers();
    users.get(userID).friends.forEach((friend) => {
      let div = document.getElementById("sample-friend").cloneNode(true);
      div.setAttribute("class", "friend");
      div.getElementsByClassName("content")[0].getElementsByClassName("username")[0].innerHTML = users.get(friend).name;
      div.getElementsByClassName("pfp")[0].getElementsByClassName("pfpimg")[0].setAttribute("src",users.get(friend).profileurl);
      document.getElementById("friend-list").appendChild(div);
    });
    
}

addUsers();
