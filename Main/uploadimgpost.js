// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { collection, getDocs, doc, getDoc, addDoc, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";




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
const storage = getStorage(app);

const up = document.getElementById("btn")
const uid = JSON.parse(localStorage.getItem("user-info")).uid
const no = document.querySelector(".cancel")



// let initApp = () => {
        
// };



const postBtn = document.getElementById("accept-post")

        const addImgPost = document.getElementById('open-file');

            
          addImgPost.addEventListener('change',(e) => {
            no.classList.remove("hide")
            uploadImagePost(e.target.files[0])
            // postBtn.addEventListener('click', ()=>{

            //     uploadImagePost(e.target.files[0])
            // });
          });

        


function uploadImagePost(file) {
  const fileName = Date.now()

  const metadata = {
      contentType: 'image/jpeg',
  };
  const storageRef = ref(storage, 'post image/'+ fileName);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on('state_changed',
(snapshot) => {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;
    case 'storage/canceled':
      // User canceled the upload
      break;

    // ...

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, 
() => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    localStorage.setItem("img", downloadURL)
    localStorage.setItem("img-id", fileName)
    // get(downloadURL)
    no.classList.add("hide")
    document.querySelector(".test-img").setAttribute("src", downloadURL)
    canPost.classList.remove("not-thing")
  });
}
);
}

// window.addEventListener("load", initApp)