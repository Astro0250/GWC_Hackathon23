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
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  }
});

function sendToDatabase(interestsArray) {
    setDoc(doc(db, "users", currentUser.uid), {
        "interests": interestsArray
    }, {merge: true});
    reroute();
}

document.getElementById("submit-button").addEventListener("click", function () {
    console.log("submitting");
    submitInterests();
});

let interestsArray = [];

function submitInterests() {
    let interests = document.getElementsByClassName("Interest-Selected");
    for (let i = 0; i < interests.length; i++) {
        let interest = interests[i];
        interestsArray.push(interest.innerHTML);
    }
    console.log(interestsArray);
    sendToDatabase(interestsArray);
}

function reroute() {
    window.location.replace("../home/home.html");
}