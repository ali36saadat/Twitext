//IMPORTS
import User from "./Class/User.js"
import Tweet from "./Class/Tweet.js"
import currentUser from "./main.js"
import signUpExport from "./signUp.js"
import loginExport from "./login.js"
import homeExport from "./home.js"
import newTweetExport from "./newTweet.js"
import searchExport from "./search.js"
import profileExport from "./profile.js"
import editProfileExport from "./editProfile.js"
import commentExport from "./comment.js"

//Twitext Routers
const routes = {
   404: "/pages/404.html",
   "/": "/pages/home.html",
   "#home": "/pages/home.html",
   "#search": "/pages/search.html",
   "#profile": "/pages/profile.html",
   "#signUp": "/pages/signUp.html",
   "#login": "/pages/login.html",
   "#search": "/pages/search.html",
   "#editProfile": "/pages/editProfile.html",
   "#what": "/pages/what.html",
   "#newTweet": "/pages/newTweet.html",
   "#comment": "/pages/comment.html",
}

//Handle Path
const handleLocation = async (e) => {
   const githubPath = e.includes("/Twitext") ? "/Twitext" : ""
   const query = e.replace(/(#[^\W_]+).*/, "$1").replace("/Twitext", "")

   const path = e || window.location.hash
   window.location.hash = `${githubPath}${path}`
   const route = routes[query] || routes[404]
   const html = await fetch(route).then((data) => data.text())
   document.getElementById("content").innerHTML = html

   handleScript(e)
}

//Exporting the HandlePathFunction
export default handleLocation

//Exporting the Path Function
const handleScript = function (e) {
   const pathFunc = e.replace(/(#[^\W_]+).*/, "$1")
   const fragment = e.split("?=")[1]

   if (pathFunc == "#signUp") {
      document.getElementById("contentTitle").innerHTML = "SIGN UP"
      signUpExport()
   } else if (pathFunc == "#login") {
      document.getElementById("contentTitle").innerHTML = "LOGIN"
      loginExport()
   } else if (pathFunc == "#home" || e == "/") {
      document.getElementById("contentTitle").innerHTML = `            <img
               src="./img/twitext-logo.png"
               alt="twitextLogo"
               style="height: 64px" />`

      homeExport()
   } else if (pathFunc == "#newTweet") {
      document.getElementById("contentTitle").innerHTML = "NEW TWEET"
      newTweetExport()
   } else if (pathFunc == "#profile") {
      document.getElementById("contentTitle").innerHTML = "PROFILE"
      profileExport(fragment || "")
   } else if (pathFunc == "#search") {
      document.getElementById("contentTitle").innerHTML = "SEARCH"
      searchExport()
   } else if (pathFunc == "#editProfile") {
      document.getElementById("contentTitle").innerHTML = "EDIT PROFILE"
      editProfileExport()
   } else if (pathFunc == "#comment") {
      document.getElementById("contentTitle").innerHTML = "COMMENT"
      commentExport(fragment)
   }
}

//Route WINDOW
const route = (event) => {
   event = event || window.event
   event.preventDefault()
   handleLocation(event.target.getAttribute("href"))
}

//Like or Unlike WINDOW
const likeTweet = (username) => {
   const tweetElement = document.querySelector(`.tweet-${username}`)
   const thisTweet = Tweet.findWithId(username)

   const tweetLikesElement = document.querySelector(`.tweetLikes-${username}`)
   if (thisTweet.likes.includes(currentUser.username)) {
      tweetElement.textContent = "🤍"
      tweetLikesElement.textContent = +tweetLikesElement.textContent - 1

      thisTweet.toggleLike(currentUser.username)
   } else {
      tweetElement.textContent = "❤️"
      tweetLikesElement.textContent = +tweetLikesElement.textContent + 1

      thisTweet.toggleLike(currentUser.username)
   }
}

//Follow or Unfollow WINDOW
const followUser = () => {
   const userFragment = window.location.hash.split("?=")[1]
   const userFollow = User.findWithUsername(userFragment)

   if (userFollow.checkRequest(currentUser.username)) {
      const infoBtnStyle = document.querySelector(".information__right-follow")

      infoBtnStyle.classList.remove("information__right-request")
      infoBtnStyle.textContent = "Follow"
      userFollow.removeRequest(currentUser.username)
   } else if (userFollow.checkFollow(currentUser.username)) {
      const infoBtnStyle = document.querySelector(".information__right-follow")

      infoBtnStyle.classList.remove("information__right-request")
      infoBtnStyle.textContent = "Follow"
      userFollow.unfollowFollowing(currentUser.username)
   } else {
      const infoBtnStyle = document.querySelector(".information__right-follow")

      infoBtnStyle.classList.add("information__right-request")
      infoBtnStyle.textContent = "Requested"
      userFollow.sendFollowRequest(currentUser.username)
   }
}

//Accept or Decline WINDOW
const acceptDeclineRequest = (data) => {
   const myUser = User.findWithUsername(currentUser.username)
   if (data[0] == "a") {
      const followersDigits = document.querySelector(
         ".detail__left-follower-digits"
      )

      currentUser.followRequests = currentUser.followRequests.filter(
         (u) => u != data[1]
      )
      myUser.acceptFollowRequest(data[1])

      followersDigits.textContent = +followersDigits.textContent + 1
   } else {
      currentUser.followRequests = currentUser.followRequests.filter(
         (u) => u != data[1]
      )
      myUser.rejectFollowRequest(data[1])
   }

   document
      .getElementById(`user-${data[1]}`)
      .closest(".requestList__user")
      .remove()
}

window.route = route
window.likeTweet = likeTweet
window.followUser = followUser
window.acceptDeclineRequest = acceptDeclineRequest
