const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/receipts')

const router = express.Router()

const checkJwt = require('../auth0')

//gets all receipts
//GET /api/v1/receipts
router.get('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub
  console.log(auth0Id)
  db.getReceipts(auth0Id)
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

//GET /api/v1/receipts.store

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

// ADD /api/v1/receipts
// (add receipt)

router.post('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub
  const receipt = req.body
  console.log(receipt)
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
///api/v1/receipts/#

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

//Delete receipt by id
// /api/v1/receipts/#

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

//get the stores in the receipt
//GET api/v1/receipts/all/stores

router.get('/all/stores', checkJwt, (req, res) => {
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

//GET api/v1/receipts/all/categories
router.get('/all/categories', checkJwt, (req, res) => {
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
