// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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


signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});