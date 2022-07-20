const express = require('express')
const db = require('../db/')
const checkJwt = require('../auth0')

const router = express.Router()
module.exports = router

router.get('/username', checkJwt, async (req, res) => {
  const auth0Id = req.user?.sub
  try {
    const username = await db.getUsername(auth0Id)
    res.json(username)
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error')
  }
})

router.post('/', async (req, res) => {
  const newUser = req.body
  const { auth0Id, email, username } = newUser
  const user = {
    auth0_id: auth0Id,
    email,
    username,
  }
  try {
    await db.createUser(user)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})
