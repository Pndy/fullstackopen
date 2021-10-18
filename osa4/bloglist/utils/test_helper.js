const Blog = require("../models/blog")
const User = require("../models/user")

const initPosts = [
  {
    title: "Hello World",
    author: "Single",
    url: "hello-world",
    likes: 10
  },
  {
    title: "Second blogpost",
    author: "Ali",
    url: "second-blogpost",
    likes: 5
  }
]

const getAllPosts = async () => {
  const posts = await Blog.find({})
  return posts.map(post => post.toJSON())
}

const getAllUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initPosts, getAllPosts, getAllUsers
}