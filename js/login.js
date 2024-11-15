//IMPORTS
import handleLocation from "./router.js"

//Login Logic Function
const loginExport = function () {
   const loginBtn = document.querySelector(".login__submit-btn")
   const loginErr = document.querySelector(".login__submit-error")
   const UN_input = document.querySelector(".login__input-un")
   const PW_input = document.querySelector(".login__input-pw")
   const changeToSignIn = document.querySelector(".login__change-title-btn")

   UN_input.value = ""
   PW_input.value = ""

   loginBtn.addEventListener("click", function () {
      if (UN_input.value && PW_input.value) {
         const users = JSON.parse(localStorage.getItem("users"))
         const finderUser = users.find(
            (u) => UN_input.value == u.username && PW_input.value == u.password
         )
         if (finderUser) {
            localStorage.setItem("currentUser", JSON.stringify(finderUser))
            location.reload()
         } else {
            loginErr.classList.remove("hiddenVisibility")
            loginErr.textContent = "User is not found"
         }
      } else {
         loginErr.classList.remove("hiddenVisibility")
         loginErr.textContent = "Inputs are empty"
      }
   })

   changeToSignIn.addEventListener("click", function () {
      handleLocation("#signIn")
   })
}

export default loginExport
