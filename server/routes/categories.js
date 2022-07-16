const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/categories')

const router = express.Router()

module.exports = router

// Get all predefined categories from database
// GET api/v1/categories
router.get('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub

  db.getCategories(auth0Id)
    .then((categories) => {
      res.json(categories)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})
