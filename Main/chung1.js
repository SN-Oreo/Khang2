
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { collection, getDocs, doc, getDoc, addDoc, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
const database = getDatabase(app)
const db = getFirestore(app);

// console.log(localStorage.getItem("user-uid"))
const uid = localStorage.getItem("user-uid")
const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  document.querySelectorAll(".my-name").forEach(a => a.innerHTML = docSnap.data().fullname)
  // console.log(docSnap.data().avatar);
  

  if(docSnap.data().avatar == "../img/avatar7.jpg"){
    document.querySelectorAll(".avatar-user").forEach(a => a.setAttribute("src", "../img/avatar7.jpg"))
  }else{
    document.querySelectorAll(".avatar-user").forEach(a => a.setAttribute("src", docSnap.data().avatar))
  }
  

} else {
  console.log("No such document!");
}



// Check logout, login

const logOut = document.querySelector(".logout")

let signOut = () => {
  localStorage.removeItem("user-cred")
  localStorage.removeItem("user-uid")
  localStorage.removeItem("user-info")
  window.location.href = "../Login Register/login.html"
}




logOut.addEventListener("click", signOut)



// User Avatar...

