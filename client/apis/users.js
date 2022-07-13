const request = require('superagent')

const usersURL = '/api/v1/users'
export function addUser(newUser) {
  return request
    .post(usersURL)
    .send(newUser)
    .then((res) => res)
    .catch((err) => console.log(err))
}
