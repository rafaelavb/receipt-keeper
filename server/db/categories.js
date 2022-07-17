const connection = require('./connection')

function getCategories(db = connection) {
  return db('categories').select('id as categoryId', 'type as categoryType')
}

module.exports = {
  getCategories,
}
