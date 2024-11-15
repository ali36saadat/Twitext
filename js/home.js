//IMPORTS
import Tweet from "./Class/Tweet.js"
import currentUser from "./main.js"

//Home Logic Function
const homeExport = function () {
   setTimeout(() => {
      const followingsArray = [currentUser.username, ...currentUser.followings]

      const tweets = Tweet.followingTweets(followingsArray)

      const followingsTweets = new Tweet()
      const followingsTweetsCode = followingsTweets.code(tweets)
      document.getElementById("content").innerHTML += followingsTweetsCode
   }, 0)
}

export default homeExport
