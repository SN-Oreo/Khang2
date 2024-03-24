import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { collection, getDocs, doc, getDoc, addDoc, getFirestore, onSnapshot, deleteDoc, updateDoc, arrayRemove, arrayUnion } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref,  deleteObject } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";


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
const storage = getStorage(app);

const uid = JSON.parse(localStorage.getItem("user-info")).uid
const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);
const friendRef = docSnap.data().friends

const allAccount = []


const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((docs) => {
    
    if(docs.data().uid == uid){
        
    }else{
        allAccount[allAccount.length] = docs.data().uid
    }

    console.log(docs.id, " => ", docs.data());
});

// Friend

const friendAddArea = document.querySelector(".friend-add-area")
const friendAddContent = document.querySelector(".friend-add-content")
const friendListArea = document.querySelector(".friend-list-area")
const friendListContent = document.querySelector(".friend-list-content")

// Friend add

allAccount.forEach( async (e) => {
    const newFriendRef = doc(db, "users", e);
    const newFriendSnap = await getDoc(newFriendRef);


    const nFContainer = document.createElement("div")
    nFContainer.classList.add("nf-container", "nf-container-" + e)

    const nFLeft = document.createElement("div")
    nFLeft.classList.add("nf-left")
    
    const nFAvatar = document.createElement("img")
    nFAvatar.classList.add("nf-avatar", "user-avatar")
    nFAvatar.setAttribute("src", newFriendSnap.data().avatar)

    const nFRight = document.createElement("div")
    nFRight.classList.add("nf-right")

    const nFName = document.createElement("h3")
    nFName.classList.add("nf-name")
    nFName.innerHTML = newFriendSnap.data().fullname

    const nFRequest = document.createElement("button")
    nFRequest.classList.add("nf-request-" + e, "nf-request")
    nFRequest.innerHTML = "Add friend"

    friendAddContent.appendChild(nFContainer)
    nFContainer.appendChild(nFLeft)
    nFContainer.appendChild(nFRight)
    nFLeft.appendChild(nFAvatar)
    nFRight.appendChild(nFName)
    nFRight.appendChild(nFRequest)

    nFRequest.addEventListener("click", async () => {
        await updateDoc(newFriendRef, 
            {
                "friends": arrayUnion(uid)
            }
        )
        await updateDoc(docRef, 
            {
                "friends": arrayUnion(e)
            }
        )
        nFContainer.style.display = "none"
    })

})

// Friend list

docSnap.data().friends.forEach( async (e) => {
    const friendRef = doc(db, "users", e);
    const friendSnap = await getDoc(friendRef);


    const fContainer = document.createElement("div")
    fContainer.classList.add("f-container", "f-container-" + e)

    const fRight = document.createElement("div")
    fRight.classList.add("f-right")

    const fLeft = document.createElement("div")
    fLeft.classList.add("f-left")
    
    const fAvatar = document.createElement("img")
    fAvatar.classList.add("f-avatar", "user-avatar")
    fAvatar.setAttribute("src", friendSnap.data().avatar)


    const fName = document.createElement("h3")
    fName.classList.add("f-name")
    fName.innerHTML = friendSnap.data().fullname


    friendListContent.appendChild(fContainer)
    fContainer.appendChild(fLeft)
    fContainer.appendChild(fRight)
    fLeft.appendChild(fAvatar)
    fRight.appendChild(fName)
})


const requests = document.querySelector(".requests")
const list = document.querySelector(".list")

requests.addEventListener("click", () => {
    friendAddArea.style.display = "block"
    friendListArea.style.display = "none"
})
list.addEventListener("click", () => {
    friendAddArea.style.display = "none"
    friendListArea.style.display = "block"
})