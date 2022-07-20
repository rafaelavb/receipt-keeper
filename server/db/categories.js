const connection = require('./connection')

function getCategories(db = connection) {
  return db('categories').select(
    'categories.id as categoryId',
    'categories.type as categoryType'
  )
}

module.exports = {
  getCategories,
}
