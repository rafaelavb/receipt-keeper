const express = require('express')
const db = require('../db')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  db.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch(() => {
      res.status(500).send('Server Error')
    })
})
