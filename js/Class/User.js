//IMPORTS
import uuidv4 from "../uuid.js"

//USER CLASS
class User {
   constructor(
      id,
      firstName,
      lastName,
      username,
      password,
      bio = "",
      followers = [],
      followings = [],
      followRequests = []
   ) {
      this.id = id || uuidv4()
      this.firstName = firstName
      this.lastName = lastName
      this.username = username
      this.password = password
      this.bio = bio || ""
      this.followers = followers || []
      this.followings = followings || []
      this.followRequests = followRequests || []
   }

   register() {
      const users = JSON.parse(localStorage.getItem("users")) || []
      if (!users.some((user) => user.username === this.username)) {
         users.push(this)
         localStorage.setItem("users", JSON.stringify(users))
         return true
      } else {
         return false
      }
   }

   login(password) {
      if (this.password === password) {
         return true
      } else {
         return false
      }
   }

   updateBio(newBio) {
      this.bio = newBio
      this.updateProfileLocal()
   }

   sendFollowRequest(username) {
      this.followRequests.push(username)

      this.updateProfileLocal()
   }

   acceptFollowRequest(username) {
      const user = User.findProfile(username)

      this.followRequests = this.followRequests.filter((reqUsername) => {
         return reqUsername != username
      })

      this.followers.push(username)
      user.followings.push(this.username)
      User.updateProfile(user)
      this.updateProfileLocal()
   }

   rejectFollowRequest(username) {
      const user = User.findProfile(username)

      this.followRequests = this.followRequests.filter((reqUsername) => {
         return reqUsername != username
      })

      User.updateProfile(user)
      this.updateProfileLocal()
   }

   unfollowFollowing(username) {
      const user = User.findProfile(username)

      user.followings = user.followings.filter((reqUsername) => {
         return reqUsername != this.username
      })

      this.followers = this.followers.filter((reqUsername) => {
         return reqUsername != username
      })

      User.updateProfile(user)
      this.updateProfileLocal()
   }

   removeRequest(u) {
      this.followRequests = this.followRequests.filter((r) => {
         u != r
      })

      this.updateProfileLocal()
   }

   checkRequest(u) {
      const statusRequest = this.followRequests.includes(u)
      if (statusRequest) {
         return true
      } else {
         return false
      }
   }

   checkFollow(u) {
      const statusFollow = this.followers.includes(u)
      if (statusFollow) {
         return true
      } else {
         return false
      }
   }

   updateProfileLocal() {
      const users = JSON.parse(localStorage.getItem("users"))

      users.forEach((user) => {
         if (user.username === this.username) {
            Object.assign(user, this)
         }
      })
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(this))
   }

   static updateProfile(updatedUser) {
      const users = JSON.parse(localStorage.getItem("users"))

      users.forEach((user) => {
         if (user.username === updatedUser.username) {
            Object.assign(user, updatedUser)
         }
      })
      localStorage.setItem("users", JSON.stringify(users))
   }

   static findProfile(username) {
      const users = JSON.parse(localStorage.getItem("users"))

      const user = users.find((user) => user.username === username) || false

      return user
   }

   static findWithUsername(u) {
      const users = JSON.parse(localStorage.getItem("users"))

      const user = users.find((user) => user.username == u) || false

      const foundUser = new User(
         user.id,
         user.firstName,
         user.lastName,
         user.username,
         user.password,
         user.bio,
         user.followers,
         user.followings,
         user.followRequests
      )
      return foundUser
   }
}

export default User
