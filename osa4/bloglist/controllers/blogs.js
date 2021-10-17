const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))  
  })
  
blogRouter.post('/', async (request, response) => {
  const body = response.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter