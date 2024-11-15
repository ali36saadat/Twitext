//IMPORTS
import User from "./Class/User.js"
import handleLocation from "./router.js"
import currentUser from "./main.js"

//EditProfile Logic Function
const editProfileExport = function () {
   setTimeout(() => {
      const updatedUser = new User(
         currentUser.id,
         currentUser.firstName,
         currentUser.lastName,
         currentUser.username,
         currentUser.password,
         currentUser.bio,
         currentUser.followers,
         currentUser.followings,
         currentUser.followRequests
      )

      const editFirstNameInput = document.querySelector(
         ".editProfile__firstName-input"
      )
      const editLastNameInput = document.querySelector(
         ".editProfile__lastName-input"
      )
      const editBioInput = document.querySelector(".editProfile__bio-textArea")
      const editSaveBtn = document.querySelector(".editProfile__save-btn")

      editFirstNameInput.value = currentUser.firstName
      editLastNameInput.value = currentUser.lastName
      editBioInput.value = currentUser.bio

      editSaveBtn.addEventListener("click", function () {
         if (editFirstNameInput.value && editLastNameInput.value) {
            currentUser.firstName = editFirstNameInput.value
            currentUser.lastName = editLastNameInput.value
            currentUser.bio = editBioInput.value

            User.updateProfile(currentUser)
            localStorage.setItem("currentUser", JSON.stringify(currentUser))

            handleLocation("#profile")
         }
      })
   }, 0)
}

export default editProfileExport
