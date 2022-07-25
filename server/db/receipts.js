const connection = require('./connection')

function getReceipts(auth0Id, db = connection) {
  return db('receipts')
    .join('users', 'receipts.auth0_id', 'users.auth0_id')
    .join('categories', 'receipts.category_id', 'categories.id')
    .join('warranties', 'receipts.id', 'warranties.receipt_id')
    .select(
      'users.username as username',
      'receipts.id as id',
      'receipts.auth0_id as auth0Id',
      'receipts.name as name',
      'receipts.image as image',
      'receipts.purchase_date as purchaseDate',
      'receipts.store as store',
      'receipts.price as price',
      'receipts.note as note',
      'categories.id as categoryId',
      'categories.type as categoryType',
      'warranties.id as warrantyId',
      'warranties.expiry_date as expiryDate',
      'warranties.period as warrantyPeriod',
      'warranties.period_unit as warrantyPeriodUnit'
    )
    .where({ 'users.auth0_id': auth0Id })
}

function getReceipt(receiptId, db = connection) {
  return db('receipts')
    .join('users', 'receipts.auth0_id', 'users.auth0_id')
    .join('categories', 'receipts.category_id', 'categories.id')
    .join('warranties', 'receipts.id', 'warranties.receipt_id')
    .select(
      'users.username as username',
      'receipts.id as id',
      'receipts.auth0_id as auth0Id',
      'receipts.name as name',
      'receipts.image as image',
      'receipts.purchase_date as purchaseDate',
      'receipts.store as store',
      'receipts.price as price',
      'receipts.note as note',
      'categories.id as categoryId',
      'categories.type as categoryType',
      'warranties.id as warrantyId',
      'warranties.expiry_date as expiryDate',
      'warranties.period as warrantyPeriod',
      'warranties.period_unit as warrantyPeriodUnit'
    )
    .where({ 'receipts.id': receiptId })
    .first()
}

function addReceipt(auth0Id, newReceipt, db = connection) {
  return db('receipts').insert(
    {
      auth0_id: auth0Id,
      name: newReceipt.name,
      image: newReceipt.image,
      purchase_date: newReceipt.purchaseDate,
      store: newReceipt.store,
      price: newReceipt.price,
      category_id: newReceipt.categoryId,
      note: newReceipt.note,
    },
    'id'
  )
}

function updateReceipt(
  auth0Id,
  { id, name, image, purchaseDate, store, price, note, categoryId },
  db = connection
) {
  return db('receipts')
    .update({
      name,
      image,
      purchase_date: purchaseDate,
      store,
      price,
      category_id: categoryId,
      note,
    })
    .where({ auth0_id: auth0Id } && { id: id })
}

function deleteReceipt(auth0Id, receipt, db = connection) {
  return db('receipts')
    .del()
    .where({ auth0_id: auth0Id } && { id: receipt.id })
}

module.exports = {
  getReceipts,
  getReceipt,
  addReceipt,
  deleteReceipt,
  updateReceipt,
}
