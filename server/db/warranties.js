const connection = require('./connection')

// Add warranty
function addWarranty(receipt, newReceiptId, db = connection) {
  return db('warranties').insert(
    {
      expiry_date: receipt.expiryDate ? receipt.expiryDate : null,
      period: receipt.warrantyPeriod ? receipt.warrantyPeriod : null,
      period_unit: receipt.warrantyPeriodUnit
        ? receipt.warrantyPeriodUnit
        : null,
      receipt_id: newReceiptId,
    },
    ['id']
  )
}

// Update warranty
function updateWarranty(
  { warrantyId, expiryDate, warrantyPeriod, warrantyPeriodUnit },
  db = connection
) {
  return db('warranties')
    .update({
      expiry_date: expiryDate ? expiryDate : null,
      period: warrantyPeriod ? warrantyPeriod : null,
      period_unit: warrantyPeriodUnit ? warrantyPeriodUnit : null,
    })
    .where({ id: warrantyId })
}

function deleteWarranty(receipt, db = connection) {
  return db('warranties').del().where({ id: receipt.warrantyId })
}

module.exports = {
  addWarranty,
  updateWarranty,
  deleteWarranty,
}
