//IMPORTS
import User from "./Class/User.js"
import handleLocation from "./router.js"

//signIn Logic Function
const signUpExport = function () {
   const signUpBtn = document.querySelector(".sign__submit-btn")
   const signUpErr = document.querySelector(".sign__submit-error")
   const FN_input = document.querySelector(".sign__input-fn")
   const LN_input = document.querySelector(".sign__input-ln")
   const UN_input = document.querySelector(".sign__input-un")
   const PW_input = document.querySelector(".sign__input-pw")
   const changeToLogin = document.querySelector(".sign__change-title-btn")

   FN_input.value = ""
   LN_input.value = ""
   UN_input.value = ""
   PW_input.value = ""

   signUpBtn.addEventListener("click", function () {
      if (
         FN_input.value &&
         LN_input.value &&
         UN_input.value &&
         PW_input.value
      ) {
         const newUser = new User(
            "",
            FN_input.value,
            LN_input.value,
            UN_input.value,
            PW_input.value,
            "",
            "",
            "",
            ""
         )

         if (newUser.register(newUser)) {
            FN_input.value = ""
            LN_input.value = ""
            UN_input.value = ""
            PW_input.value = ""
         } else {
            signUpErr.classList.remove("hiddenVisibility")
            signUpErr.textContent = "Username is not available"
         }
      } else {
         signUpErr.classList.remove("hiddenVisibility")
         signUpErr.textContent = "Inputs are empty"
      }
   })

   changeToLogin.addEventListener("click", function () {
      handleLocation("#login")
   })
}

export default signUpExport
