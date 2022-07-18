import request from 'superagent'
// import Axios from 'axios'

//V1 - Axios (Client to Cloudinary) - Working
//axios is fine but I would use it or superagent, not both
// const cloudinaryUploadEndpoint =
//   'https://api.cloudinary.com/v1_1/receipt-keepers/image/upload'

// export function uploadImageToCloudinary(data) {
//   return Axios.post(cloudinaryUploadEndpoint, data)
//     .then((res) => {
//       const { url, public_id, signature } = res.data
//       return { url, public_id, signature }
//     })
//     .catch((err) => console.log(err))
// }

//V2 - Superagent (Client to Cloudinary) - Working
export function uploadImageToCloudinary(formData) {
  const cloudName = 'receipt-keepers'
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  return request
    .post(url)
    .send(formData)
    .then((res) => {
      const { url, public_id, signature } = res.body
      return { url, public_id, signature }
    })
}

//V3 - Superagent (Client -> Server -> Cloudinary) - Not Working Yet
// export function uploadImageToCloudinary(image) {
//   // console.log('api', image.name)
//   // console.log(string)
//   return (
//     request
//       .post('/api/v1/images')
//       .send(image)
//       //.set('accept', 'json')
//       .then((res) => {
//         console.log(res.body)
//       })
//   )
// }
