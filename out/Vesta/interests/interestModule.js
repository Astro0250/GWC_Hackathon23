import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

async function addInterests()
{
    try {
        const snapshot = await getDocs(collection(db, 'interest-categories'));

        snapshot.docs.forEach(doc => {
            let subInterests = doc.data()['sub-interests'];
            subInterests.forEach((subInterest) => {
                let div = document.createElement('div');
                div.innerHTML = subInterest;
                div.setAttribute("id", subInterest);
                div.setAttribute("class", "interest-choice");
                div.setAttribute("selected", "false");
                div.setAttribute("visible", "true");
                div.style.order = Math.floor(Math.random() * 40);
                div.addEventListener("click", (d) => 
                {
                    if (d.target.getAttribute("selected") == "false")
                    {
                        d.target.setAttribute("selected", "true");
                    }
                    else
                    {
                        d.target.setAttribute("selected", "false");
                    }
                })
                div.setAttribute("selection-group", doc.id);
                document.getElementById('interests-container').appendChild(div);
            });    
        });
    } catch (error) {
        console.error(error.message);
    }
}


export async function sendToDatabase(interestsArray) 
{
    console.log(interestsArray);
    await updateDoc(doc(db, "users", sessionStorage.getItem("userID")), {
        interests: interestsArray
    });
    console.log("submitted");
    reroute();
}


function reroute() {
    window.location.replace("../home/home.html");
}

addInterests();