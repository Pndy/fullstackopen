const userRouter = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1})
  res.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (req, res, next) => {
  const body = req.body

  if(!body.password || !body.username){
    return res.status(400).send({ error: 'username and password are required' })
  }

  if(body.password.length < 3){
    return res.status(400).send({ error: 'password should be at least 3 characters' })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await newUser.save()
  res.json(savedUser)
})

module.exports = userRouter