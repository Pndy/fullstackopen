const Blog = require("../models/blog")

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

module.exports = {
  initPosts, getAllPosts
}