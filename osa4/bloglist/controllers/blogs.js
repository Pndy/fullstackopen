const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  res.json(blogs.map(blog => blog.toJSON()))  
})

blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const post = await Blog.findById(id).populate('user', {username: 1, name: 1})
  if(post) {
    res.json(post.toJSON())
  }else{
    res.status(404).end()
  }
})
  
blogRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne()

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).json(result)
})

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const newPost = await Blog.findByIdAndUpdate(id, post, { new: true })
  res.json(newPost.toJSON())
})

module.exports = blogRouter