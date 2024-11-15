//IMPORTS
import Tweet from "./Class/Tweet.js"
import currentUser from "./main.js"

//NewTweet Logic Function
const newTweetExport = function () {
   setTimeout(() => {
      const newTweetBtn = document.querySelector(".newTweet-btn")

      newTweetBtn.addEventListener("click", function () {
         const newTweetInput = document.querySelector(".newTweet-input")
         const newTweetInputValue = newTweetInput.value

         if (newTweetInputValue) {
            const newTweet = new Tweet(
               null,
               newTweetInputValue,
               currentUser.username,
               `${currentUser.firstName} ${currentUser.lastName}`,
               null,
               null,
               null
            )
            newTweet.save()
            newTweetInput.value = ""
         }
      })
   }, 0)
}

export default newTweetExport
