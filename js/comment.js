//IMPORTS
import currentUser from "./main.js"
import Tweet from "./Class/Tweet.js"

//Comment Logic Function
const commentExport = function (frag) {
   setTimeout(() => {
      const tweets = JSON.parse(localStorage.getItem("tweets"))
      const commentInput = document.querySelector(".newComment__textarea")
      const commentBtn = document.querySelector(".newComment__submit-btn")
      const commentUsername = document.querySelector(".tweet__information-name")
      const commentContent = document.querySelector(".tweet__content")
      const tweetData = tweets.find((t) => t.id == frag)

      const currentTweet = new Tweet(
         tweetData.id,
         tweetData.content,
         tweetData.authorUsername,
         tweetData.authorName,
         tweetData.date,
         tweetData.likes,
         tweetData.comments
      )

      commentUsername.textContent = currentTweet.authorName
      commentContent.textContent = currentTweet.content

      document
         .getElementById("content")
         .insertAdjacentHTML("beforeend", currentTweet.commentsCode())

      commentBtn.addEventListener("click", function () {
         currentTweet.addComment(
            commentInput.value,
            `${currentUser.firstName} ${currentUser.lastName}`
         )

         const content = document.getElementById("content")

         content.insertAdjacentHTML(
            "beforeend",
            `
               <div class="comment">
                  <div class="comment__container">
                     <div>from :<span class="comment__name">${currentUser.username}</span></div>
                     <div class="comment__content">${commentInput.value}</div>
                  </div>
               </div>
         `
         )

         commentInput.value = ""
      })
   }, 0)
}

export default commentExport
