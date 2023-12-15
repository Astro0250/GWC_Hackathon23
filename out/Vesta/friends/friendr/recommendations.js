// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const users = new Map();
const userID = sessionStorage.getItem("userID");
const categories = ["arts","academics","books","music","games-and-technology","tv-and-movies","sports"];
const compatabilityMap = new Map();
const auth = getAuth();

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

function calculateCompatabilityScore(loggedInUser, other)
{
    if (loggedInUser == other)
    {
        return null;
    }
    let score = 0.5;
    let interests = users.get(loggedInUser).interests;
    for (let interest of interests)
    {
        if (users.get(other).interests.includes(interest))
        {
            score = Math.pow(score, 0.75);
        }
    } 
    let t = 0;
    for (let c of categories) { t += 1-Math.abs(users.get(loggedInUser).categories[c] - users.get(other).categories[c]);}
    t = 1 - ((t/categories.length) + score)/2;
    score = Math.pow(0.5, t*2);
    return score;
}
  

async function getCompatability()
{
    await getAllUsers();
    users.forEach((val, key) => compatabilityMap.set(key, calculateCompatabilityScore(userID, key)));
    compatabilityMap.forEach((val, key) => 
    {
        if (val != null)
        {
            let div = document.getElementById("sample-friend-recommendation").cloneNode(true);
            div.getElementsByClassName("name")[0].innerHTML = users.get(key).name;
            div.getElementsByClassName("pfp")[0].src = users.get(key).profileurl;
            div.setAttribute("class", "friend-rec");
            let addButton = document.createElement("button");
            addButton.innerHTML = "Add";
            addButton.setAttribute("class", "add-button");
            addButton.setAttribute("target", key);
            addButton.addEventListener("click", (e) =>
            {
                if (!users.get(userID).friends.includes(e.target.getAttribute("target")))
                {
                    addToFriendsList(e.target.getAttribute("target"));
                }
            });
            div.getElementsByClassName("name")[0].appendChild(addButton);
            div.style.order = 1-val;
            users.get(key).interests.forEach((interest) => 
            {
                let intTag = div.getElementsByClassName("sample-interest-tag")[0].cloneNode();
                intTag.innerHTML = interest;
                intTag.setAttribute("class", "interest-tag");
                div.getElementsByClassName("interests")[0].appendChild(intTag);
            });
            console.log(val);
            document.getElementById("friends-container").appendChild(div);
        }
    });
}

async function addToFriendsList(id)
{
    users.get(userID).friends.push(id);
    await updateDoc(doc(db, "users", userID), {
        friends: users.get(userID).friends
    });
}

getCompatability();

