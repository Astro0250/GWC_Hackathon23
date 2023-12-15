
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

const sample = document.querySelector("#samplePost")

function getPosts() {
    // Initialize Firebase
    getDocs(collection(db, 'posts'))
        .then((snapshot) => {
            let posts = [];
            snapshot.docs.forEach(doc => {
                posts.push(doc.data());
            });
            sortPostsByDate(posts);
            setPosts(posts);
        })
        .catch((error) => {
            console.log(error.message);
        });
}
function sortPostsByDate(posts) {
    posts.sort((a, b) => {
        return b['timestamp'] - a['timestamp'];
    });
}
function setPosts(posts) {
    posts.forEach((post) => {
        console.log(post);
        let clone = sample.cloneNode(true);
        document.getElementById("feed").append(clone);
        clone.getElementsByClassName('pfp')[0].getElementsByClassName("account-info-pfp")[0].src = post['pfp'];
        clone.getElementsByClassName('content')[0].getElementsByClassName('post-header')[0].getElementsByClassName('username')[0].innerHTML = post['owner'];
        clone.getElementsByClassName('content')[0].getElementsByClassName('text')[0].innerHTML = post['content'];
        const date = new Date(post['timestamp']);
        clone.getElementsByClassName('content')[0].getElementsByClassName('post-header')[0].getElementsByClassName('date')[0].innerHTML = `${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)} at ${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date)}`;
        clone.style.display = "flex";
    });
}
getPosts();

async function getUserData(uid) {
    const docref = doc(db, "users", uid);
    const userData = await getDoc(docref);

    if (userData.data() != null) {
        console.log("data exists!");
        console.log(userData.data());
    } else {
        console.log("no data");
    }
}

const auth = getAuth();
let currentUser = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        currentUser = user;
        getUserData(uid);
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

document.getElementById("postBtn").addEventListener('click', (e) => {
    const data = {
        content: document.getElementById("postContent").value,
        owner: currentUser.displayName,
        pfp: currentUser.photoURL,
        timestamp: Date.now(),
        userid: currentUser.uid
    };
    setDoc(doc(db, "posts", `${Date.now()}`), data);
    postOverlay.style.display = "none";
    let post = data;
    let clone = sample.cloneNode(true);
    document.getElementById("feed").prepend(clone);
    clone.getElementsByClassName('pfp')[0].getElementsByClassName("account-info-pfp")[0].src = post['pfp'];
    clone.getElementsByClassName('content')[0].getElementsByClassName('post-header')[0].getElementsByClassName('username')[0].innerHTML = post['owner'];
    clone.getElementsByClassName('content')[0].getElementsByClassName('text')[0].innerHTML = post['content'];
    const date = new Date(post['timestamp']);
    clone.getElementsByClassName('content')
        [0].getElementsByClassName('post-header')[0].getElementsByClassName('date')[0].innerHTML = `${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)} at ${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date)}`;
    clone.style.display = "flex";
});