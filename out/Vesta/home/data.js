
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

function getPosts(){
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    getDocs(collection(db, 'posts'))
        .then((snapshot) => {
            let posts = [];
            snapshot.docs.forEach(doc => {
                posts.push(doc.data());
            });
            setPosts(posts);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
    function setPosts(posts){
    let index = 1;
    posts.forEach((post) => {
        document.getElementById(index).getElementsByClassName('content')[0].getElementsByClassName('username')[0].innerHTML = post['owner'];
        document.getElementById(index).getElementsByClassName('content')[0].getElementsByClassName('text')[0].innerHTML = post['content'];
        index++;
    });
}
getPosts();

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("logged in!");
  } else {
    console.log("not logged in..."); //eventually redirect to sign in
  }
});