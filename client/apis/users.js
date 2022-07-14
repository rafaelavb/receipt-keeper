const request = require('superagent')

const usersURL = '/api/v1/users'
export function addUser(newUser) {
  return request
    .post(usersURL)
    .send(newUser)
    .then((res) => res)
    .catch((err) => console.log(err))
}

export function getUsername(token) {
  return request
    .get('/username')
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.log(err))
}
