const modal = document.querySelector(".modal")
const openModalBtn = document.querySelector(".new-post")
const closeModalBtn = document.querySelector(".close-btn")

openModalBtn.addEventListener("click", () => {
    modal.classList.remove("hide")
})

closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hide")
})




window.addEventListener("load", ()=>{
    if(document.querySelector(".test-img").getAttribute("src") == null){
    }else{
        //not thing
    }
})

const testText = document.querySelector(".post-text")
const canPost = document.querySelector(".accept-post")


function haveText(){
    if(document.querySelector(".test-img").getAttribute("src") !== null || !testText.value == ""){
        canPost.classList.remove("not-thing")

    }else{
        canPost.classList.add("not-thing")

    }

}