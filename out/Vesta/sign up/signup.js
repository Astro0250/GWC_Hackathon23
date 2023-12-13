// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
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
            document.getElementById("googleBtn").style.display = "none";
            const data = {
                catergories: {
                    academic:0.5,
                    art:0.5,
                    craft:0.5,
                    games:0.5,
                    social:0.5,
                    sport:0.5,
                    tech:0.5
                },
                clubs: [],
                friends: [],
                interests: [],
                name: user.displayName,
                profileurl: user.photoURL,
                settings: {
                    notifications: null,
                    privacy: null,
                    theme: null
                }
            };
            setDoc(doc(db, "users", user.uid), data);
            setTimeout(() => {  window.location.replace("../interests/interests.html"); }, 500);
        } else {
            window.location.replace("../home/home.html");
        }
    }).catch((error) => {
        console.log(error.message);
    });

document.getElementById("googleBtn").addEventListener('click', (e) => {
    signInWithRedirect(auth, provider);
});
