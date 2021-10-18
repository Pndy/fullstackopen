const supertest = require('supertest');
const app = require('../app.js')
const mongoose = require('mongoose')
const helper = require("../utils/test_helper.js")
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash("salasana", 10)
  const newUser = new User({
    username: "user",
    passwordHash,
    name: "User user"
  })
  await newUser.save()
})

describe('Users: get all users', () => {
  test('gets user as json and matches', async () => {
    const Users = await api
      .get("/api/users")
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(Users.body.length).toBe(1)
    expect(Users.body[0].username).toBe('user')
  })
})

describe('Users: registering new accounts', () => {

  test('correct details creates new account', async () => {
    const usersBefore =  await helper.getAllUsers()

    const newUserDetails = {
      username: "user 2",
      password: "password",
      name: "Another User"
    }

    await api
      .post('/api/users')
      .send(newUserDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.getAllUsers()

    expect(usersAfter.length).toBe(usersBefore.length+1)
  })

  test('username has to be unique when creating account', async () => {
    const usersBefore =  await helper.getAllUsers()

    const newUserDetails = {
      username: "user",
      password: "password123",
      name: "Totally new user"
    }

    await api
      .post('/api/users')
      .send(newUserDetails)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"User validation failed: username: Error, expected '
              +'`username` to be unique. Value: `user`"}')

    const usersAfter = await helper.getAllUsers()

    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('missing username does not create account', async () => {
    const usersBefore =  await helper.getAllUsers()

    const newUserDetails = {
      password: "password",
      name: "Another User"
    }

    await api
      .post('/api/users')
      .send(newUserDetails)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"username and password are required"}')

    const usersAfter = await helper.getAllUsers()

    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('missing password does not create account', async () => {
    const usersBefore =  await helper.getAllUsers()

    const newUserDetails = {
      username: 'User3',
      name: "Another User"
    }

    await api
      .post('/api/users')
      .send(newUserDetails)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"username and password are required"}')

    const usersAfter = await helper.getAllUsers()

    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('too short password does not create account', async () => {
    const usersBefore =  await helper.getAllUsers()

    const newUserDetails = {
      username: 'User3',
      password: "12",
      name: "Another User"
    }

    await api
      .post('/api/users')
      .send(newUserDetails)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"password should be at least 3 characters"}')

    const usersAfter = await helper.getAllUsers()

    expect(usersAfter.length).toBe(usersBefore.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})