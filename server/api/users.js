const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { createUser, getUser, getUserByUsername, getUserById } = require('../db')
const SALT_COUNT = 10
const { JWT_SECRET = 'neverTell' } = process.env

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  // request must have both
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    })
  }

  try {
    const user = await getUser({ username, password })
    console.log(user)
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      })
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1w' }
      )
      res.send({ user, message: "you're logged in!", token })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const queriedUser = await getUserByUsername(username)
    if (queriedUser) {
      res.status(401)
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      })
    } else {
      const user = await createUser({
        username,
        password,
      })
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        })
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: '1w' }
        )
        res.send({ user, message: "you're signed up!", token })
      }
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/users/me
router.get('/me', (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

// --------- ADD ADDITONAL USER ROUTES AS NEEDED ---------
module.exports = router
