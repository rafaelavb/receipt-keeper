const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/')

const router = express.Router()

// Get all receipts
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

// *** DON'T NEED ***
// Get single receipt by ID
// GET /api/v1/receipts
// router.get('/:id', checkJwt, (req, res) => {
//   const id = req.params.id

//   db.getReceipt(id)
//     .then((receipt) => {
//       res.json(receipt)
//     })
//     .catch((err) => {
//       console.error(err.message)
//       res.status(500).send('Server error')
//     })
// })

// Add new receipt
// ADD /api/v1/receipts
router.post('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub
  const receiptData = req.body

  db.addReceipt(auth0Id, receiptData)
    .then((ids) => {
      const newReceiptId = ids[0]
      db.addWarranty(receiptData, newReceiptId)
      return newReceiptId
    })
    .then((newReceiptId) => {
      console.log('second promise', newReceiptId)
      const createdReceipt = db.getReceipt(newReceiptId)
      console.log('new receipt from db', '\n', createdReceipt)
      res.json(createdReceipt)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// Update receipt
// PATCH /api/v1/receipts
router.patch('/', checkJwt, (req, res) => {
  const updatedReceipt = req.body

  db.updateReceipt(updatedReceipt)
    .then(() => {
      return db.updateWarranty(updatedReceipt)
    })
    .then(() => {
      return db.getReceipt(updatedReceipt.id)
    })
    .then((receipt) => {
      console.log(receipt)
      res.json(receipt)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})

// Delete receipt
// DELETE /api/v1/receipts
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

// *** DON'T NEED ***
// Get the stores in the receipt
// GET api/v1/receipts/all/stores
// router.get('/all/stores', checkJwt, (req, res) => {
//   const auth0Id = req.user?.sub

//   db.getStores(auth0Id)
//     .then((stores) => {
//       res.json(stores)
//     })
//     .catch((err) => {
//       console.error(err.message)
//       res.status(500).send('Server error')
//     })
// })

// *** DON'T NEED ***
// GET /api/v1/receipts.store
// router.get('/', checkJwt, (req, res) => {
//   const auth0Id = req.user?.sub

//   db.getStores(auth0Id)
//     .then((stores) => {
//       res.json(stores)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.status(500).send('Server Error')
//     })
// })

// *** DON'T NEED ***
// GET api/v1/receipts/all/categories
// router.get('/all/categories', checkJwt, (req, res) => {
//   const auth0Id = req.user?.sub

//   db.getTypes(auth0Id)
//     .then((categories) => {
//       res.json(categories)
//     })
//     .catch((err) => {
//       console.error(err.message)
//       res.status(500).send('Server error')
//     })
// })

module.exports = router
