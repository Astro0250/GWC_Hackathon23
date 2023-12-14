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
const userID = "GjSpCmxE9yaBjgGVkDXZ0hUKjJf1" //sessionStorage.getItem("userID")
const categories = ["arts","academics","books","music","games-and-technology","tv-and-movies","sports"];
const compatabilityMap = new Map();

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
    
async function getCategories()
{
    const snapshot = await getDocs(collection(db, 'interests-categories'));
    snapshot.docs.forEach(doc => 
        {
            categories.push(doc.id);
        });
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
  

(async () => {
    await getAllUsers();
    await getCategories();
    console.log(users);
    users.forEach((val, key) => compatabilityMap.set(key, calculateCompatabilityScore(userID, key)));
})();

console.log()


