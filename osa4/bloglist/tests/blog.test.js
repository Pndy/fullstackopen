const supertest = require('supertest');
const app = require('../app.js')
const mongoose = require('mongoose')
const helper = require("../utils/blog_helper.js")
const api = supertest(app)

const blog = require('../models/blog')

beforeEach(async () => {
  await blog.deleteMany({})
  await blog.insertMany(helper.initPosts)
})

describe('Blog: Get all blogposts', () => {
  
  test("returns as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns right amount of posts', async () => {
    const posts = await helper.getAllPosts()
    expect(posts.length).toBe(helper.initPosts.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})