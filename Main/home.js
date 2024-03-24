// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { collection, getDocs, doc, getDoc, addDoc, getFirestore, onSnapshot, deleteDoc, updateDoc, arrayRemove, arrayUnion, query } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref,  deleteObject } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";




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

// const uid = JSON.parse(localStorage.getItem("user-info")).uid
// const avatarRef = ref(storage, 'user avatar/' + uid);

const uid = localStorage.getItem("user-uid")
const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);
//post


const modal = document.querySelector(".modal")
const addPost = document.getElementById("accept-post")

addPost.addEventListener("click", async ()=>{
  const addText = document.querySelector(".post-text").value

  const fullname = JSON.parse(localStorage.getItem("user-info"))
  const postImg = localStorage.getItem("img")
  const postImgId = localStorage.getItem("img-id")

  await addDoc(collection(db, "posts"), {
    "title": addText,
    "postname": fullname.fullname,
    "postavatar": docSnap.data().avatar,
    "postimg": postImg,
    "postimgid": postImgId,
    "postuserid":fullname.uid,
    "like":[],
    "comment":[]
  });
  modal.classList.add("hide")
  localStorage.removeItem("img")
  localStorage.removeItem("img-id")
  window.location.href = "home.html"

})

document.querySelector(".post-text").placeholder = docSnap.data().fullname + " ơi, bạn đang nghĩ gì thế?"

const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((docs) => {
  // doc.data() is never undefined for query doc snapshots
  const divPosts = document.querySelector(".posts")

  const div = document.createElement("div")
  div.classList.add("div")
  const div1 = document.createElement("div")
  div1.classList.add("div1")
  const div2 = document.createElement("div")
  div2.classList.add("div2")
  const div3 = document.createElement("div")
  div3.classList.add("div3")


  const newDivPost = document.createElement("div")
  newDivPost.classList.add("post-" + docs.id, "post")

  const postTop = document.createElement("div")
  postTop.classList.add("post-top-" + docs.id, "post-top")

  const userAvatar = document.createElement("img")
  userAvatar.classList.add("post-avatar-" + docs.id, "post-avatar")
  userAvatar.setAttribute("src", docs.data().postavatar)

  const userName = document.createElement("h3")
  userName.classList.add("post-name-" + docs.id, "post-name")
  userName.innerHTML = docs.data().postname

  const removePost = document.createElement("button")
  removePost.setAttribute("id","remove-" + docs.id)
  removePost.classList.add("remove-post")
  // const remove = document.querySelector("remove" + doc.id)
  removePost.innerHTML = "x"


  const postBottom = document.createElement("div")
  postBottom.classList.add("post-bottom-" + docs.id, "post-bottom")

  const postImg = document.createElement("img")
  postImg.classList.add("img-" + docs.id)
  postImg.setAttribute("src", docs.data().postimg)


  const postText = document.createElement("h5")
  postText.innerHTML = docs.data().title

  const postEnd = document.createElement("div")
  postEnd.classList.add("post-end-" + docs.id, "post-end")

  const likeContent = document.createElement("div")
  likeContent.classList.add("like-" + docs.id, "like")
  
  const likePost = document.createElement("ion-icon")
  likePost.setAttribute("name", "heart-outline")
  likePost.classList.add("likes-" + docs.id, "likes")

  const numberLikes = document.createElement("h3")
  numberLikes.classList.add("number-like-" + docs.id, "number-like")
  numberLikes.innerHTML = docs.data().like.length

  const commentContent = document.createElement("div")
  commentContent.classList.add("comment-" + docs.id, "comment")

  const comment = document.createElement("ion-icon")
  comment.setAttribute("name", "chatbox")
  comment.classList.add("comments-" + docs.id, "comments")

  const numberComments = document.createElement("h3")
  numberComments.classList.add("number-comment-" + docs.id, "number-comment")
  numberComments.innerHTML = docs.data().comment.length

  const commentContainer = document.createElement("div")
  commentContainer.classList.add("c-container-" + docs.id, "c-container")

  const commentBottom = document.createElement("div")
  commentBottom.classList.add("c-bottom")

  const commentTop = document.createElement("div")
  commentTop.classList.add("c-top")


  const commentPost = document.createElement("input")
  commentPost.classList.add("comment-post-" + docs.id, "comment-post")
  commentPost.setAttribute("type", "text")
  commentPost.setAttribute("placeholder", docSnap.data().fullname + " ơi hãy nói gì đó")

  const enterCommnent = document.createElement("button")
  enterCommnent.classList.add("c-enter-" + docs.id, "c-enter", "cant-enter")
  enterCommnent.innerHTML = '<ion-icon name="send"></ion-icon>'

  


  postTop.appendChild(div)
  postTop.appendChild(div1)
  div.appendChild(div2)
  div.appendChild(div3)
  div2.appendChild(userAvatar)
  div2.appendChild(userName)
  div3.appendChild(postText)
  divPosts.appendChild(newDivPost)

  postBottom.appendChild(postImg)

  newDivPost.appendChild(postTop)
  newDivPost.appendChild(postBottom)
  newDivPost.appendChild(postEnd)
  newDivPost.appendChild(commentContainer)

  likeContent.appendChild(likePost)
  likeContent.appendChild(numberLikes)
  postEnd.appendChild(likeContent)
  postEnd.appendChild(commentContent)
  commentContent.appendChild(comment)
  commentContent.appendChild(numberComments)


  commentContainer.appendChild(commentTop)
  commentContainer.appendChild(commentBottom)
  commentBottom.appendChild(commentPost)
  commentBottom.appendChild(enterCommnent)





  

  // console.log(docs.id, " => ", docs.data());

  const post = docs.data()


//remove post code

  if(docs.data().postuserid == JSON.parse(localStorage.getItem("user-info")).uid){
    div1.appendChild(removePost)

    const remove = document.getElementById("remove-" + docs.id)
    remove.addEventListener("click", async ()=>{
      const postImgRef = ref(storage, 'post image/'+ docs.data().postimgid);

        // Delete the file
        deleteObject(postImgRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
        //...
      const docPostRef = doc(db, "posts", docs.id)
        await deleteDoc(docPostRef);
        // ...
        
        window.location.href = "home.html"
    })
  }

// Like

  const likeButton = document.querySelector((".like-" + docs.id))

// Check like

  post.like.forEach((e)=>{
    if(e === uid){
      likePost.setAttribute("name", "heart")
      likePost.style.color = "red"
    }
  })

// like click

  likeButton.addEventListener("click", async ()=>{
    const docRefMe = doc(db, "users", uid);
    const docRef = doc(db, "posts", docs.id);

      if(likePost.getAttribute("name") == "heart-outline"){
        likePost.setAttribute("name", "heart")
        likePost.style.color = "red"
        await updateDoc(docRef, 
          {
            "like": arrayUnion(uid)
          }
        )
        await updateDoc(docRefMe, 
          {
            "likeposts": arrayUnion(docs.id)
          }
        )
        // newNumberLike.innerHTML = docs.data().like.length
      }else{
        likePost.setAttribute("name", "heart-outline")
        likePost.style.color = "var(--text-color)"
        await updateDoc(docRef, 
          {
            'like': arrayRemove(uid)
            
          }
        )
        await updateDoc(docRefMe, 
          {
            "likeposts": arrayRemove(docs.id)
          }
        )
        // newNumberLike.innerHTML = docs.data().like.length

      }

      
  })

// Comment click

  commentContent.addEventListener("click", () => {
      commentContainer.style.display = "block"
      comment.style.color = "rgb(0, 132, 255)"
  })
  

// Send comment

  commentPost.addEventListener("blur", ()=>{
    if(!commentPost.value == ""){
      enterCommnent.classList.remove("cant-enter")
      
    }else{
      enterCommnent.classList.add("cant-enter")
      
    }

  })
  enterCommnent.addEventListener("click", async () => {
      const commentRef = doc(db, "posts", docs.id);
      const commentSnap = await getDoc(commentRef);
    
      await updateDoc(commentRef, 
        {
          "comment": arrayUnion(
            {
              "cavatar": docSnap.data().avatar,
              "cname": docSnap.data().fullname,
              "ctext": commentPost.value,
              
            }
          )
        }
      )
      commentPost.value = ""
    numberComments.innerHTML = docs.data().comment.length + 1
  
  })
  
//Create comment
async function createComment() {
  const commentRef = doc(db, "posts", docs.id);
  const commentSnap = await getDoc(commentRef);

  commentSnap.data().comment.forEach((i) => {
    const aComment = document.createElement("div")
    aComment.classList.add("a-comment")

    const cAvatar = document.createElement("img")
    cAvatar.classList.add("c-avatar")
    cAvatar.setAttribute("src", i.cavatar)

    const cArea = document.createElement("div")
    cArea.classList.add("c-area")

    const cName = document.createElement("h4")
    cName.classList.add("c-name")
    cName.innerHTML = i.cname

    const cText = document.createElement("h5")
    cText.classList.add("c-text")
    cText.innerHTML = i.ctext

    commentTop.appendChild(aComment)
    aComment.appendChild(cAvatar)
    aComment.appendChild(cArea)
    cArea.appendChild(cName)
    cArea.appendChild(cText)

  })

}
createComment()

// const q = query(collection(db, "posts", docs.id));
// // const queryC = await getDocs(q);
// onSnapshot(q, (querySnapshot) => {
//   querySnapshot.forEach((i) => {
//     const aComment = document.createElement("div")
//     aComment.classList.add("a-comment")

//     const cAvatar = document.createElement("img")
//     cAvatar.classList.add("c-avatar")
//     cAvatar.setAttribute("src", i.cavatar)

//     const cArea = document.createElement("div")
//     cArea.classList.add("c-area")

//     const cName = document.createElement("h4")
//     cName.classList.add("c-name")
//     cName.innerHTML = i.cname

//     const cText = document.createElement("h5")
//     cText.classList.add("c-text")
//     cText.innerHTML = i.ctext

//     commentTop.appendChild(aComment)
//     aComment.appendChild(cAvatar)
//     aComment.appendChild(cArea)
//     cArea.appendChild(cName)
//     cArea.appendChild(cText)
//   });
// });

});


