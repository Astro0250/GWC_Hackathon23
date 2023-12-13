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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const users = new Map();
const userID = localStorage.getItem("userID")

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
    console.log(users.get(loggedInUser).interests);
    let interests = users.get(loggedInUser).interests;
    for (let interest of interests)
    {
        if (users.get(other).interests.includes(interest))
        {
            score = Math.pow(score, 0.75);
        }
    } 
    // rewrite for scalability and elegance
    let categories = [
        Math.abs(users.get(loggedInUser).categories.academic - users.get(other).categories.academic),
        Math.abs(users.get(loggedInUser).categories.art - users.get(other).categories.art),
        Math.abs(users.get(loggedInUser).categories.craft - users.get(other).categories.craft),
        Math.abs(users.get(loggedInUser).categories.games - users.get(other).categories.games),
        Math.abs(users.get(loggedInUser).categories.tech - users.get(other).categories.tech),
        Math.abs(users.get(loggedInUser).categories.sport - users.get(other).categories.sport)
    ]
    let t = 0;
    for (let c of categories) { t += c; }
    t += score * 6;
    t /= categories.length + 6;
    score = Math.pow(0.5, t);
    return score;
}
  

getAllUsers();
(async () => {
    await getAllUsers();
    console.log(users);
    users.forEach((val, key) => calculateCompatabilityScore(userID, key));
})();

console.log()


