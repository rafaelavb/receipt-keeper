const request = require('superagent')
const imageURL = 'api/v1/uploadImage'

export function uploadImageToCloudinary(data, token) {
  return request
    .post(imageURL)
    .set('authorization', `Bearer ${token}`)
    .send(data)
    .then((res) => console.log(res.body))
    .catch((err) => console.log(err))
}
