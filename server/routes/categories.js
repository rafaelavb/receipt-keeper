const express = require('express')
const db = require('../db/categories')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  db.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})
