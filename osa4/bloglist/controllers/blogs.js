const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))  
})

blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const post = await Blog.findById(id)
  if(post) {
    res.json(post.toJSON())
  }else{
    res.status(404).end()
  }
})
  
blogRouter.post('/', async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  
  const result = await blog.save()
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