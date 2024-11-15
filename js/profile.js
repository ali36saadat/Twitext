//IMPORTS
import Tweet from "./Class/Tweet.js"
import User from "./Class/User.js"
import currentUser from "./main.js"
import handleLocation from "./router.js"

//Profile Logic Function
const profileExport = function (frag) {
   const mainUser = frag ? User.findProfile(frag) : currentUser
   if (frag && currentUser.username != frag) {
      document
         .querySelector(".information__right-themselves")
         .classList.remove("hiddenVisibility", "hiddenDisplay")

      const hisUser = User.findWithUsername(window.location.hash.split("?=")[1])
      if (hisUser.checkRequest(currentUser.username)) {
         const infoBtnStyle = document.querySelector(
            ".information__right-follow"
         )

         infoBtnStyle.classList.add("information__right-request")
         infoBtnStyle.textContent = "Requested"
      } else if (hisUser.checkFollow(currentUser.username)) {
         const infoBtnStyle = document.querySelector(
            ".information__right-follow"
         )

         infoBtnStyle.classList.add("information__right-request")
         infoBtnStyle.textContent = "Followed"
      }
   } else {
      document
         .querySelector(".information__right-myself")
         .classList.remove("hiddenVisibility", "hiddenDisplay")

      if (currentUser.followRequests.length) {
         document
            .querySelector(".requestList")
            .classList.remove("hiddenVisibility", "hiddenDisplay")

         currentUser.followRequests.forEach((u) => {
            currentUser
            const requestContainer = document.getElementById("requestList")

            requestContainer.insertAdjacentHTML(
               "beforeend",
               `
            <div class="requestList__user">
               <a href="#profile?=${u}" onclick="route()">${u}</a>
               <div class="requestList__status">
                  <div class="requestList__status">
                     <button class="emoji emoji-accept" onclick="acceptDeclineRequest(['a','${u}'])" id="user-${u}">✔️</button>
                     <button class="emoji emoji-decline" onclick="acceptDeclineRequest(['d','${u}'])"id="user-${u}">❌</button>
                  </div>
                  <div class="requestList__status-decline"></div>
               </div>
            </div>
         `
            )
         })
      }
   }

   const myTweet = new Tweet()
   const profileName = document.querySelector(".information__name")
   const profileUsername = document.querySelector(".information__username")
   const profileBio = document.querySelector(".bio")
   const profileBioText = document.querySelector(".bio__text")

   const profileFollowers = document.querySelector(
      ".detail__left-follower-digits"
   )
   const profileFollowings = document.querySelector(
      ".detail__left-following-digits"
   )

   const profileTweets = document.querySelector(".detail__right-post-digits")

   profileName.textContent = `${mainUser.firstName} ${mainUser.lastName}`
   profileUsername.textContent = mainUser.username

   let profileLogoutBtn, profileEditBtn

   if (mainUser.bio) {
      profileBioText.textContent = mainUser.bio
   } else {
      profileBio.classList.add("hiddenDisplay")
      profileBio.classList.add("hiddenVisibility")
   }

   setTimeout(() => {
      profileLogoutBtn = document.querySelector(".information__right-logout")
      profileEditBtn = document.querySelector(".information__right-edit")

      profileLogoutBtn?.addEventListener("click", function () {
         localStorage.setItem("currentUser", JSON.stringify(""))
         location.reload()
      })

      profileEditBtn?.addEventListener("click", function () {
         handleLocation("#editProfile")
      })
   }, 0)

   profileFollowers.textContent = mainUser.followers.length
   profileFollowings.textContent = mainUser.followings.length

   const myTweets = myTweet.getPostById(mainUser.username)

   profileTweets.textContent = myTweets.length

   const myTweetsHTML = myTweet.code(myTweets)
   document.getElementById("content").innerHTML += myTweetsHTML
}

export default profileExport
