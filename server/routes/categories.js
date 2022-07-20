const express = require('express')
const db = require('../db')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  db.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
})
