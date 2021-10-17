const userRouter = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res, next) => {
  const body = req.body

  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await newUser.save()
  res.json(savedUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(user => user.toJSON()))
})

module.exports = userRouter