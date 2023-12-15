
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
const auth = getAuth();

var currentUser = null;
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

document.getElementById("logoutBtn").addEventListener('click', (e) => {
  signOut(auth)
    .then(() => {
      window.location.replace("../sign up/signup.html");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const friendElements = document.querySelectorAll('.friend');
console.log("friends:" + friendElements);
friendElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    console.log("clicked");
    document.getElementById('chatOverlay').style.display = "flex";
    openChat(event.target.id);
  });
});
let currentChat = null;
let chatID = null;
function openChat(friendID) {
  if (friendID.localeCompare(currentUser.uid) >= 0) {
    chatID = friendID + currentUser.uid;
  } else {
    chatID = currentUser.uid + friendID;
  }
  let newChat = true;
  let chat = null;
  let messages = null;
  const chatRef = collection(db, 'chats');
  getDocs(chatRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.id == chatID) {
        chat = doc.data();
        currentChat = chat;
        console.log(chat);
        setMessages(chat);
      }
    });
  });

  if (chat == null) {
    const chatRef = collection(db, 'chats');
    setDoc(doc(chatRef, chatID), {
      messages: [
      {
        message:{
            content: "Welcome to your new chat!",
            owner: "System"
        }
      }
    ]
    });
    getDocs(chatRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id == chatID) {
          chat = doc.data();
          currentChat = chat;
          console.log(chat['messages']);
          setMessages(chat);
        }
      });
    });
  }
}
function setMessages(chat) {
  let messages = chat['messages'];
  let sample = document.querySelector("#sampleMessage");
  messages.forEach((post) => {
    let clone = sample.cloneNode(true);
    document.getElementById("messages").append(clone);
    clone.getElementsByClassName('content')[0].getElementsByClassName('message-content')[0].innerHTML = post['content'];
    clone.getElementsByClassName('content')[0].getElementsByClassName('username')[0].innerHTML = post['owner'];
    clone.style.display = "static";
  });
}

document.getElementById('sendBtn').addEventListener('click', (e) => {
  let message = document.getElementById('messageInput').value;
  document.getElementById('messageInput').value = "";
  let messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = message;
  document.getElementById('messages').appendChild(messageElement);
  
  currentChat['messages'].push({
    content: message,
    owner: currentUser.displayName
  });
  setDoc(doc(db, "chats", chatID), {
    messages: currentChat['messages']
  });
});