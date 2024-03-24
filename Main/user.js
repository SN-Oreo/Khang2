// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { collection, getDocs, doc, getDoc, addDoc, getFirestore, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref,  deleteObject } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";




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
const database = getDatabase(app)
const db = getFirestore(app);
const storage = getStorage(app);


const uid = JSON.parse(localStorage.getItem("user-info")).uid
const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);


const background = document.querySelector(".background-user")

background.setAttribute("src", docSnap.data().background)


