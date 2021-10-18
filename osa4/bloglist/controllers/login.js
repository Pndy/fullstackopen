const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({username: body.username})
  const passCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(!(user && passCorrect)){
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const dataForJwt = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(dataForJwt, process.env.SECRET)

  res.status(200).json({username: user.username, token})
})


module.exports = loginRouter