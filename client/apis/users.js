const request = require('superagent')

export function addUser(newUser) {
  return request.post('/users').send(newUser).catch(logError)
}
