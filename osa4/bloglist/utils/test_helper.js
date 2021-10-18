const Blog = require("../models/blog")
const User = require("../models/user")

const initUser = {
  username:"user",
  name:"User user",
  passwordHash:"$2b$10$BuXePRK8Rj9p1FpVCztn.O/P.7w2JKUXx69mzhj9i/AGHwbBbkHNG",
  blogs: []
}

const initDatabase = async () => {

  await User.deleteMany({})
  await Blog.deleteMany({})

  const tmpuser = new User(initUser)
  const user = await tmpuser.save()
  const post1 = new Blog({
    title: "Blog post 1",
    author: "Arthur",
    url: "http://localhost/blog/1",
    likes: 10,
    user: user._id.toString()
  })
  const post2 = new Blog({
    title: "Blog post 2",
    author: "James",
    url: "http://localhost/blog/2",
    likes: 5,
    user: user._id.toString(),
  })
  const p1 = await post1.save()
  const p2 = await post2.save()
  user.blogs = user.blogs.concat(p1._id)
  user.blogs = user.blogs.concat(p2._id)
  await user.save()
}

const getAllPosts = async () => {
  const posts = await Blog.find({})
  return posts.map(post => post.toJSON())
}

const getAllUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  getAllPosts, getAllUsers, initDatabase
}