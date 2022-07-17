const connection = require('./connection')

// Get all the receipts
function getReceipts(auth0_id, db = connection) {
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
    .where({ 'users.auth0_id': auth0_id })
}

// Get a single receipt by id
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

// Add a receipt
function addReceipt(auth0_id, newReceipt, db = connection) {
  console.log('db newReceipt', newReceipt)
  return db('receipts').insert({
    auth0_id: auth0_id,
    name: newReceipt.name,
    image: newReceipt.image,
    purchase_date: newReceipt.purchaseDate,
    store: newReceipt.store,
    price: newReceipt.price,
    category_id: newReceipt.categoryId,
    note: newReceipt.note,
  })
}

// Update receipt by id
function updateReceipt(
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
    .where({ id })
}

// Delete receipt by id
function deleteReceipt(receiptId, db = connection) {
  return db('receipts').del().where({ 'receipts.id': receiptId })
}

module.exports = {
  getReceipts,
  getReceipt,
  addReceipt,
  deleteReceipt,
  updateReceipt,
}
