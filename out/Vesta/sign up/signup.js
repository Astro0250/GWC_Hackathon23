// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, getAdditionalUserInfo } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
const db = getFirestore(app);

getRedirectResult(auth)
    .then((result) => {
        const user = result.user;
        if (getAdditionalUserInfo(result).isNewUser) {
            const data = {
                interests: [user.email]
            };
            setDoc(doc(db, "users", user.uid), data);
            window.location.replace("../intrests/intrests.html");
        } else {
            window.location.replace("../home/home.html");
        }
    }).catch((error) => {
        console.log(error.message);
    });

document.getElementById("googleBtn").addEventListener('click', (e) => {
    signInWithRedirect(auth, provider);
});