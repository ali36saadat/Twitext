//IMPORTS
import currentUser from "../main.js"

//TWEET CLASS
class Tweet {
   constructor(id, content, authorUsername, name, date, likes, comments) {
      this.id = id || Math.random().toString(36).substr(2, 9)
      this.content = content
      this.authorName = name
      this.authorUsername = authorUsername
      this.date = date || new Date().toISOString()
      this.likes = likes || []
      this.comments = comments || []
   }

   save() {
      const posts = JSON.parse(localStorage.getItem("tweets")) || []
      posts.push(this)
      localStorage.setItem("tweets", JSON.stringify(posts))
   }

   toggleLike(username) {
      if (!this.likes.includes(username)) {
         this.likes.push(username)
         this.updateLocalStorage(this)
      } else {
         this.likes = this.likes.filter((u) => u != username)
         this.updateLocalStorage(this)
      }
   }

   addComment(commentContent, authorUsername) {
      const comment = {
         id: Math.random().toString(36).substr(2, 9),
         authorUsername,
         content: commentContent,
         date: new Date().toISOString(),
      }
      this.comments.push(comment)
      this.updateLocalStorage(this)
   }

   updateLocalStorage(tweet) {
      const tweets = JSON.parse(localStorage.getItem("tweets"))
      tweets.forEach((t) => {
         if (t.id === tweet.id) {
            Object.assign(t, tweet)
         }
      })
      localStorage.setItem("tweets", JSON.stringify(tweets))
   }

   getPostById(username) {
      const tweets = JSON.parse(localStorage.getItem("tweets")) || []
      return tweets.filter((tweet) => tweet.authorUsername == username)
   }

   //Convert Tweets Array To HTML Code - TWEET COMPONENT
   code(tweets) {
      let HTMLCode = ``
      for (let t of tweets) {
         const containUserInArray = t.likes.includes(currentUser.username)
         HTMLCode += `
      <div class="tweet">
         <div class="tweet__information">
            <a class="tweet__information-username" onclick="route()" href="#profile?=${
               t.authorUsername
            }">@${t.authorUsername}</a>
            <div class="tweet__information-name">${t.authorName}</div>
         </div>
         <div class="tweet__content">${t.content}</div>
         <div class="tweet__detail">
            <div class="tweet__detail-like">
               <button
                  class="tweet__detail-like-icon tweet-${t.id}"
                  onclick="likeTweet('${t.id}')">
                  ${containUserInArray ? "❤️" : "🤍"}
               </button>
               <div class="tweet__detail-like-digits tweetLikes-${t.id}">
                  ${t.likes.length}
               </div>
            </div>
            <div class="tweet__detail-comment">
               <a
                  class="tweet__detail-comment-icon"
                  onclick="route()"
                  href="#comment?=${t.id}">
                  💬
               </a>
               <div class="tweet__detail-comment-digits">${
                  t.comments.length
               }</div>
            </div>
         </div>
      </div>
`
      }

      return HTMLCode
   }

   //Convert Tweet Comments To HTML Code - COMMENT COMPONENT
   commentsCode() {
      const comments = this.comments
      let code = ``
      for (let c of comments) {
         code += `
                     <div class="comment">
                        <div class="comment__container">
                           <div>from : <span class="comment__name">${c.authorUsername}</span></div>
                           <div class="comment__content">${c.content}</div>
                        </div>
                     </div>
      `
      }
      return code
   }

   static findWithId(id) {
      const tweets = JSON.parse(localStorage.getItem("tweets"))
      const tweetData = tweets.find((t) => {
         return t.id == id
      })
      return new Tweet(
         tweetData.id,
         tweetData.content,
         tweetData.authorUsername,
         tweetData.authorName,
         tweetData.date,
         tweetData.likes,
         tweetData.comments
      )
   }

   static followingTweets(array) {
      const tweets = JSON.parse(localStorage.getItem("tweets")) || []

      const followingsTweets = tweets.filter((tweet) =>
         array.includes(tweet.authorUsername)
      )

      followingsTweets.sort((a, b) => new Date(a.date) - new Date(b.date))

      return followingsTweets
   }
}

export default Tweet
