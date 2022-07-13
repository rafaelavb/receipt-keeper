const connection = require('./connection')

function getReceipts(db = connection) {
  return db('receipts').select()
}

//show a single receipt

function getReceipt(id, db = connection) {
  return db('receipts').select().where('id', id).first()
}

//add to a list of receiptss
// function addReceipt(receipt, db = connection) {
//   const newReceipt = {
//     task: todos.task,
//     task_details: todos.task_details,
//     priority: todos.priority,
//     created_at: Date.now(),
//     completed: false,
//   }
//   return db('todos').insert(newTodo)
// }

//update receipt by id
// function updateReceipt(id, updatedReceipt, db = connection) {
//   return db('receipt').where('id', id).update(updatedReceipt)
// }

// delete receipt by id
// function deleteReceipt(id, db = connection) {
//   return db('receipt').where('id', id).del()
// }

module.exports = {
  getReceipts,
  getReceipt,
}
