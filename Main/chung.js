const home = document.querySelector(".home")
const friends = document.querySelector(".friends")
const more = document.querySelector(".more")

home.addEventListener("click", () => {
    window.location.href = "../Main/home.html"
})
friends.addEventListener("click", () => {
    window.location.href = "../Main/friends.html"
})
more.addEventListener("click", () => {
    window.location.href = "../Main/more.html"
})



//hiển thị setting

const openSetting = document.querySelector(".open-setting")
const setting = document.querySelector(".setting-hide")

openSetting.addEventListener("click", () => {
    if(setting.classList == "setting-hide hide"){
        setting.classList.remove("hide")
        setting.classList.add("nohide")
    }
    else{
        setting.classList.add("hide")
        setting.classList.remove("nohide")
    }
})

//...

//...



// const userCreds = JSON.parse(localStorage.getItem("user-cred"))


document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = "home.html"
})

// goto user.html
document.querySelectorAll(".user-avatar").forEach(ava => ava.addEventListener('click',() => {
        window.location.href = "user.html"
}))

// avatar


// dark mode

document.querySelector("#dark-mode-btn").addEventListener("change", ()=>{
    if(localStorage.getItem("dark-mode") == "off"){
        document.body.classList.add("dark-mode")
        localStorage.setItem("dark-mode", "on")
    }else{
        document.body.classList.remove("dark-mode")
        localStorage.setItem("dark-mode", "off")
    }
  })
  
  
  window.addEventListener("load", ()=>{
    if(localStorage.getItem("dark-mode") === "on"){
        document.querySelector("#dark-mode-btn").click()
        document.body.classList.add("dark-mode")
        localStorage.setItem("dark-mode", "on")
    }
  })


  let checkCred = () => {
    if(!localStorage.getItem("user-cred")){
    window.location.href = "../Login Register/login.html"
    }
  }

window.addEventListener("load", checkCred)
