const connection = require('./connection')

function getCategories(db = connection) {
  return db('categories').select('type as categoryType')
}

module.exports = {
  getCategories,
}
