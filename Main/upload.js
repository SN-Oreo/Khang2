
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { collection, setDoc, doc, getDoc, addDoc, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// import firebase from "https://www.gstatic.com/firebasejs/10.8.0/firebase.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

function initializeAppIfNecessary() {

  try {
  return getApp();
  } 
  catch (any) {
  const firebaseConfig = {
    apiKey: "AIzaSyDWq5ux8Z1PPJWYsg2yCKQk5zNixPMcDLY",
    authDomain: "calisthenics-vn-project.firebaseapp.com",
    databaseURL: "https://calisthenics-vn-project-default-rtdb.firebaseio.com",
    projectId: "calisthenics-vn-project",
    storageBucket: "calisthenics-vn-project.appspot.com",
    messagingSenderId: "506457853940",
    appId: "1:506457853940:web:115bb295b4ab36f0b9b3a1",
    measurementId: "G-V1CTF2C0HQ"
  };
    
    return initializeApp(firebaseConfig);
}}
    
const app = initializeAppIfNecessary();
const storage = getStorage(app);
const db = getFirestore(app);


const up = document.getElementById("btn")
const uid = JSON.parse(localStorage.getItem("user-info")).uid



// let initApp = () => {
//         const fileButton = document.getElementById('photo');

//         if (!!fileButton) {

//           fileButton.addEventListener('change', function(e) {

//             uploadAvatar(e.target.files[0])
//         });
//         }

// };


const fileAvatar = document.getElementById('photo');
const changeAvatarButton = document.getElementById("change-avatar-button")
changeAvatarButton.addEventListener("click", () => {
  fileAvatar.click()
})
fileAvatar.addEventListener('change', function(e) {

  uploadAvatar(e.target.files[0])
});



//upload Avatar

function uploadAvatar(file) {

    const metadata = {
        contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, 'user avatar/' + uid);
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
      getAvatar(downloadURL)
    });
  }
);
}


// window.addEventListener('load', initApp);

async function getAvatar(downloadURL){
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  await updateDoc(docRef, 
  {
    avatar: downloadURL
  }
  )
  window.location.href = "user.html"
  // localStorage.setItem("user-info", JSON.stringify(myInfo))
}    








const fileBackground = document.getElementById('background');
const changeBackgroundButton = document.getElementById("change-background-button")
changeBackgroundButton.addEventListener("click", () => {
  fileBackground.click()
})
fileBackground.addEventListener('change', function(e) {

  uploadBackground(e.target.files[0])
});





function uploadBackground(file) {

  const metadata = {
      contentType: 'image/jpeg',
  };
  const storageRef = ref(storage, 'user background/' + uid);
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
    getBackground(downloadURL)
  });
}
);
}

async function getBackground(downloadURL){
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  await updateDoc(docRef, 
  {
    background: downloadURL
  }
  )
  window.location.href = "user.html"

}    
