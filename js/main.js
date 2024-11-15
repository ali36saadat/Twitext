//IMPORTS
import handleLocation from "./router.js"
import navExport from "./nav.js"

//Exporting the CurrentUser in local storage
let currentUser = JSON?.parse(localStorage.getItem("currentUser"))
export default currentUser

//Add navbar
const addNav = async function () {
   let html = await fetch("/pages/nav.txt").then((data) => data.text())
   document.getElementById("root").innerHTML += html
   navExport()
}

//Checking if the user is logged in or not
if (currentUser) {
   //User is not logged - Show Path Page
   const hashLocation = window.location.hash
   if (
      hashLocation == "#login" ||
      hashLocation == "#signIn" ||
      hashLocation == ""
   ) {
      handleLocation("#home")
   } else {
      handleLocation(hashLocation)
   }
   addNav()
} else {
   //user is logged - Show Sign In Page
   handleLocation("#signIn")
}
