const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/')

const router = express.Router()

module.exports = router

router.get('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub

  db.getReceipts(auth0Id)
    .then((receipts) => {
      const parsed = receipts.map((receipt) => ({
        ...receipt,
        image: JSON.parse(receipt.image),
      }))
      res.json(parsed)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
})

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

router.delete('/:id', checkJwt, (req, res) => {
  const receiptId = req.params.id

  //this lets any user delete any receipt, you probably want to restrict this to only deleting receipts they own
  db.deleteReceipt(receiptId)
    .then(() => {
      res.send(receiptId)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server error')
    })
})
