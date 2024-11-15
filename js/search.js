//IMPORTS
import handleLocation from "./router.js"
import currentUser from "./main.js"

//Search Logic Function
const searchExport = function () {
   setTimeout(() => {
      const searchInput = document.querySelector(".search__input")

      searchInput?.addEventListener("input", function () {
         const searchInputValue = searchInput.value
         if (searchInputValue) {
            const users = JSON.parse(localStorage.getItem("users"))
            let usersFound = users.filter(
               (u) =>
                  u.username.includes(searchInputValue) &&
                  u != currentUser.username
            )

            let HTMLCode = ``
            for (let u of usersFound) {
               if (u.username != currentUser.username) {
                  HTMLCode += `
                     <div class="userFound">
                        <div class="userFound__information">
                           <a class="userFound__information-username" onclick="route()" href="#profile?=${u.username}">
                                 @${u.username}
                           </a>
                           <div class="userFound__information-name">${u.firstName} ${u.lastName}</div>
                        </div>
                        <div class="userFound__information-bio">
                           dajsdnak dasjkdnasd ajsdkasnk dasjk daksndak dasjnda snjaskdn
                        </div>
                     </div>
`
               }
            }
            document.querySelector(".userFound__container").innerHTML = HTMLCode
         } else {
            document.querySelector(".userFound__container").innerHTML = ``
         }
      })
   }, 0)
}

export default searchExport
