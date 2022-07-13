const express = require('express')

const db = require('../db/receipts')

const router = express.Router()

//gets all receipts
//GET /api/v1/receipts
router.get('/', (req, res) => {
  db.getReceipts()
    .then((receipts) => {
      res.json(receipts)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
})

//GET /api/v1/receipts/#
//get single receipt by ID

router.get('/:id', (req, res) => {
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

// ADD /api/v1/receipts
// (add receipt)

router.post('/', (req, res) => {
  const receipt = req.body
  console.log(receipt)
  db.addReceipt(receipt)
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
///api/v1/receipts/#

router.patch('/:id', (req, res) => {
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

//Delete receipt by id
// /api/v1/receipts/#

router.delete('/:id', (req, res) => {
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

module.exports = router
