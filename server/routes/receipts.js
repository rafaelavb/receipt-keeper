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
      console.log(receipts)
      const parsed = receipts.map((receipt) => {
        return { ...receipt, image: JSON.parse(receipt.image) }
      })
      res.json(parsed)
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
// POST /api/v1/receipts
// router.post('/', checkJwt, (req, res) => {
// const auth0Id = req.user?.sub
// const receiptData = req.body

// db.addReceipt(auth0Id, receiptData)
// .then((ids) => {
//   const newReceiptId = ids[0]
//   db.addWarranty(receiptData, newReceiptId).then((idArr) => {
//     // console.log('second promise', newReceiptId)
//     db.getReceipt(newReceiptId).then((createdReceipt) => {
//       // console.log('new receipt from db', '\n', createdReceipt)
//       // const parsed = {
//         //   ...createdReceipt,
//         //   image: JSON.parse(createdReceipt.image),
//         // }
//         res.json(createdReceipt)
//       })
//     })
//   })
//   .catch((err) => {
//     console.error(err.message)
//     res.status(500).send('Server error')
//   })

// *** SECOND METHOD ***
// POST /api/v1/receipts (async / await option)
router.post('/', checkJwt, async (req, res) => {
  const auth0Id = req.user?.sub
  const receipt = req.body

  try {
    const [newReceiptId] = await db.addReceipt(auth0Id, receipt)
    await db.addWarranty(receipt, newReceiptId)
    const createdReceipt = await db.getReceipt(newReceiptId)
    const parsed = {
      ...createdReceipt,
      image: JSON.parse(createdReceipt.image),
    }
    res.json(parsed)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// Update receipt
// PATCH /api/v1/receipts
// router.patch('/', checkJwt, (req, res) => {
//   const updatedReceipt = req.body

//   db.updateReceipt(updatedReceipt)
//     .then(() => {
//       return db.updateWarranty(updatedReceipt)
//     })
//     .then(() => {
//       return db.getReceipt(updatedReceipt.id)
//     })
//     .then((receipt) => {
//       // const parsed = {
//       //   ...receipt,
//       //   image: JSON.parse(receipt.image),
//       // }
//       res.json(receipt)
//     })
//     .catch((err) => {
//       console.error(err.message)
//       res.status(500).send('Server error')
//     })
// })

// *** SECOND METHOD ***
// PATCH /api/v1/receipts (async / await option)
router.patch('/', checkJwt, async (req, res) => {
  const updatedReceipt = req.body

  try {
    await db.updateReceipt(updatedReceipt)
    await db.updateWarranty(updatedReceipt)
    const patchedReceipt = await db.getReceipt(updatedReceipt.id)
    const parsed = {
      ...patchedReceipt,
      image: JSON.parse(patchedReceipt.image),
    }
    res.json(parsed)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// Delete receipt
// DELETE /api/v1/receipts
router.delete('/:id', checkJwt, (req, res) => {
  const receiptId = req.params.id
  db.deleteReceipt(receiptId)
    .then((response) => {
      res.send(receiptId)
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
