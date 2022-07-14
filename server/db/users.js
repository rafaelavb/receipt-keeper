const connection = require('./connection')

module.exports = {
  userExists,
  getUserByName,
  createUser,
  getUsername,
}

function userExists(username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then((count) => {
      return count[0].n > 0
    })
}

function getUserByName(username, db = connection) {
  return db('users').select().where('username', username).first()
}

function getUsername(auth0_id, db = connection) {
  return db('users').select().where({ auth0_id }).first()
}

function createUser(user, db = connection) {
  return db('users').insert(user)
}
