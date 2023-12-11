
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

let posts = [];
function gatherData(){
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  
    const db = getDatabase(app);

    let index = 1;
    get(child(ref(db),'Posts/FillerPost'))
    .then((snapshot) => {
        let post = [];
      snapshot.forEach(childSnapshot => {
          post.push(childSnapshot.val());
        });
        setHTMLPosts(post, index);
        index++;
    });
}
function setHTMLPosts(post, index){
    console.log(post);
    document.getElementById(index).getElementsByClassName('content')[0].getElementsByClassName('username')[0].innerHTML = post[1];
    document.getElementById(index).getElementsByClassName('content')[0].getElementsByClassName('text')[0].innerHTML = post[0];
}
gatherData();