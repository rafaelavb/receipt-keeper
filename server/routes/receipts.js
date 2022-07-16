const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/receipts')

const router = express.Router()

module.exports = router

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

// Add new receipt
// POST /api/v1/receipts
router.post('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub
  const receipt = req.body

  db.addReceipt(auth0Id, receipt)
    .then((ids) => {
      const newReceiptId = ids[0]
      db.getReceipt(newReceiptId)
    })
    .then((newReceipt) => {
      res.json(newReceipt)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// POST /api/v1/receipts (async / await option)
// router.post('/', checkJwt, async (req, res) => {
//   const auth0Id = req.user?.sub
//   const receipt = req.body

//   try {
//     const [newReceiptId] = await db.addTask(auth0Id, receipt)
//     const addedReceipt = await db.getTaskById(newReceiptId)
//     res.json(addedReceipt)
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server error')
//   }
// })

// Update receipt
// PATCH api/v1/receipts/
router.patch('/', checkJwt, (req, res) => {
  const amendedReceipt = req.body

  db.updateReceipt(amendedReceipt)
    .then(() => {
      db.getReceipt(amendedReceipt.id)
    })
    .then((updatedReceipt) => {
      res.json(updatedReceipt)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// Delete receipt
// DELETE /api/v1/receipts/
router.delete('/', checkJwt, (req, res) => {
  const receipt = req.body

  db.deleteReceipt(receipt)
    .then(() => {
      res.json()
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// *** Probably don't need ***
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

// *** Probably don't need ***
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

// *** Probably don't need ***
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
