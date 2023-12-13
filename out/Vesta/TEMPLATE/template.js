import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//import { getFirestore, collection, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
//const db = getFirestore(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    accUsername.innerHTML = user.displayName;
    accPFP.src = user.photoURL;
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