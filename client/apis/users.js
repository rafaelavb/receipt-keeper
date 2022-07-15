const request = require('superagent')

const usersUrl = '/api/v1/users'

export function addUser(newUser) {
  return request
    .post(usersUrl)
    .send(newUser)
    .then((res) => res)
    .catch((err) => console.log(err))
}

export function getUsername(token) {
  return request
    .get(`${usersUrl}/username`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body.username
    })
    .catch((err) => console.log(err))
}
