const categoriesDb = require('./categories')
const receiptsDb = require('./receipts')
const usersDb = require('./users')
const warrantiesDb = require('./warranties')

module.exports = {
  ...categoriesDb,
  ...receiptsDb,
  ...usersDb,
  ...warrantiesDb,
}
