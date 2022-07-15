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
    .get(`${usersURL}/username`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('api', res.body)
      return res.body.username
    })
    .catch((err) => console.log(err))
}
