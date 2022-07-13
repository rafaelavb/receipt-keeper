const express = require('express')

const db = require('../db/receipts')

const router = express.Router()

//gets all receipts
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

//GET /api/v1/user_name
//get single receipt by ID

router.get('/:user_name', (req, res) => {
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

// ADD /api/v1/
//(add todo task)

// router.post('/', (req, res) => {
//   const todo = req.body
//   console.log(todo)
//   db.addTodos(todo)
//     .then((ids) => {
//       const newTodoId = ids[0]
//       console.log(newTodoId)
//       return db.listTodos()
//     })
//     .then((todo) => {
//       res.json(todo)
//     })
//     .catch((err) => {
//       console.error(err.message)
//       res.status(500).send('Server error')
//     })
// })

//Update todos

// router.patch('/:id', (req, res) => {
//   const updatedReceipt = req.body
//   const id = Number(req.params.id)

//   db.updateReceipt(id, updatedReceipt)
//     .then(() => {
//       return db.getReceipt(updatedReceipt.id)
//     })
//     .then((receipt) => {
//       res.json(receipt)
//     })
//     .catch((err) => {
//       console.error(err.message)
//       res.status(500).send('Server error')
//     })
// })

// //Delete todo

// router.delete('/:id', (req, res) => {
//   const id = Number(req.params.id)
//   db.deleteTodo(id)
//     .then(() => {
//       res.json()
//     })
//     .catch((err) => {
//       console.error(err.message)
//       res.status(500).send('Server error')
//     })
// })

module.exports = router
