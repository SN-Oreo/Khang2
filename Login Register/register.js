
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, getDocs, doc, setDoc, addDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyDWq5ux8Z1PPJWYsg2yCKQk5zNixPMcDLY",
  authDomain: "calisthenics-vn-project.firebaseapp.com",
  projectId: "calisthenics-vn-project",
  storageBucket: "calisthenics-vn-project.appspot.com",
  messagingSenderId: "506457853940",
  appId: "1:506457853940:web:115bb295b4ab36f0b9b3a1",
  measurementId: "G-V1CTF2C0HQ"
};
// Initialize Firebase


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// const database = getDatabase(app)
const db = getFirestore(app);




const signUp = document.querySelector(".signup-button")



signUp.addEventListener("click",  () => {


  // const fullname = document.getElementById("full-name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const passwordComfirm = document.getElementById("password-confirm").value

  if(password == passwordComfirm){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      up(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });

  }else{
    alert("The password and the comfirm password do not match")
  }

  
})
async function up(user) {
  const fullName = document.getElementById("full-name").value
  console.log(user.uid)
  const addDocRef = doc(db, "users", user.uid)
  await setDoc(addDocRef, 
  {
    "fullname": fullName,
    "avatar": "../img/avatar7.jpg",
    "darkmode": "off",
    "uid": user.uid,
  }
  )
  window.location.href = "../Login Register/login.html"
}



