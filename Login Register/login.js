
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { collection, getDocs, doc, getDoc, addDoc, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


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
const database = getDatabase(app)
const dbref = ref(database)
const db = getFirestore(app);


const login = document.querySelector(".login-button")

login.addEventListener("click", () => {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // const users = userCredential.user.name = "Khang"
            
            // window.location.href = "../Main/home.html"
        console.log(user)
        logintk(user)

        // ...
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });

})

let logged = () => {
    if(localStorage.getItem("user-cred")){
        window.location.href = "../Main/home.html"
    }
}

window.addEventListener("load", logged)

async function logintk(user) {

    localStorage.setItem("user-cred", JSON.stringify(user))
    localStorage.setItem("user-uid", user.uid)

    const uid = localStorage.getItem("user-uid")
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const docSnapRef = docSnap.data()
        const myInfo = {
            fullname: docSnapRef.fullname,
            uid: user.uid
          }
    localStorage.setItem("user-info", JSON.stringify(myInfo))
    console.log(docSnap.data().fullname);
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
    window.location.href = "../Main/home.html"

} 


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });