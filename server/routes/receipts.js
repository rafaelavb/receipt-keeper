const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/receipts')

const router = express.Router()

// Gets all receipts
// GET /api/v1/receipts
router.get('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub

  db.getReceipts(auth0Id)
    .then((receipts) => {
      res.json(receipts)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
})

// Get single receipt by ID
// GET /api/v1/receipts/#
router.get('/:id', checkJwt, (req, res) => {
  const id = req.params.id

  db.getReceipt(id)
    .then((receipt) => {
      res.json(receipt)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// Get all stores
// GET /api/v1/receipts.store
router.get('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub

  db.getStores(auth0Id)
    .then((stores) => {
      res.json(stores)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
})

// (add receipt)
// ADD /api/v1/receipts
router.post('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub
  const receipt = req.body

  db.addReceipt(auth0Id, receipt)
    .then((ids) => {
      const newReceiptId = ids[0]
      console.log(newReceiptId)
      return db.getReceipts()
    })
    .then((receipt) => {
      res.json(receipt)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// Update receipt by id
// PATCH api/v1/receipts/#
router.patch('/:id', checkJwt, (req, res) => {
  const updatedReceipt = req.body
  const id = Number(req.params.id)

  db.updateReceipt(id, updatedReceipt)
    .then(() => {
      return db.getReceipt(updatedReceipt.id)
    })
    .then((receipt) => {
      res.json(receipt)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// Delete receipt by id
// DELETE /api/v1/receipts/#
router.delete('/:id', checkJwt, (req, res) => {
  const id = Number(req.params.id)

  db.deleteReceipt(id)
    .then(() => {
      res.json()
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// get the stores in the receipt
// GET api/v1/receipts/stores
router.get('/stores', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub

  db.getStores(auth0Id)
    .then((stores) => {
      res.json(stores)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// GET api/v1/receipts/categories
router.get('/categories', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub

  db.getTypes(auth0Id)
    .then((categories) => {
      res.json(categories)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

module.exports = router
