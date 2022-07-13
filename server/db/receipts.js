const connection = require('./connection')

//shows all the receipts
function getReceipts(db = connection) {
  return db('receipts').select()
}

//show a single receipt

function getReceipt(id, db = connection) {
  return db('receipts').select().where('id', id).first()
}

//add to a list of receipts
function addReceipt(receipts, db = connection) {
  const newReceipt = {
    auth0_id: receipts.auth0_id,
    name: receipts.name,
    image: receipts.image,
    purchase_date: receipts.purchase_date,
    store: receipts.store,
    price: receipts.price,
    note: receipts.note,
  }
  return db('receipts').insert(newReceipt)
}

// update receipt by id
function updateReceipt(id, updatedReceipt, db = connection) {
  return db('receipts').where('id', id).update(updatedReceipt)
}

// delete receipt by id
function deleteReceipt(id, db = connection) {
  return db('receipts').where('id', id).del()
}

module.exports = {
  getReceipts,
  getReceipt,
  addReceipt,
  deleteReceipt,
  updateReceipt,
}
