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

  test('returns id on right format', async () => {
    const posts = await helper.getAllPosts()
    expect(posts[0].id).toBeDefined()
  })
})

describe('Blog: posting new blogposts', () => {
  
  test("posting correct blogpost returns itself", async () => {
    const newPost = {
      title: "New Post",
      author: "New Author",
      url: "new-post",
      likes: 1
    }

    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    

    const posts = await helper.getAllPosts()
    expect(posts.length).toBe(helper.initPosts.length + 1)
    
    const titles = posts.map(post => post.title)
    expect(titles).toContain('New Post')
  })

  test('posting without likes sets it to 0', async () => {
    const newPost = {
      title: "New Post 2",
      author: "New Author 2",
      url: "new-post-2"
    }

    const newPostResponse = await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newPostResponse.body.likes).toBe(0)
  })

  test('posting without title and url returns error', async () => {
    const newPost = {
      author: "New Author 3",
    }

    const newPostResponse = await api
      .post("/api/blogs")
      .send(newPost)
      .expect(400)
      
    const posts = await helper.getAllPosts()
    const authors = posts.map(post => post.author)
    expect(authors).not.toContain(newPost.author)
      
  })
})

describe('Blog: deleting posts', () => {

  test('deleting deletes the blogpost', async () => {
    const before = await helper.getAllPosts()

    await api
      .delete(`/api/blogs/${before[before.length-1].id}`)
      .expect(204)

    const after = await helper.getAllPosts()
    expect(after.length).toBe(before.length-1)
  })
})

describe('Blog: content modification', () => {

  test('post should update likes', async () => {
    const posts = await helper.getAllPosts()

    let updatedPost = {
      title: posts[0].title,
      author: posts[0].author,
      url: posts[0].url,
      likes: posts[0].likes+1,
    }

    const updPost = await api
      .put(`/api/blogs/${posts[0].id}`)
      .send(updatedPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updPost.body).not.toContainEqual(posts[0])
    expect(updPost.body.likes).toBe(posts[0].likes+1)
  })
})


afterAll(() => {
  mongoose.connection.close()
})