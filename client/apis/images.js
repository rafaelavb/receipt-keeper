import Axios from 'axios'

const cloudinaryUploadEndpoint =
  'https://api.cloudinary.com/v1_1/receipt-keepers/image/upload'
export function uploadImageToCloudinary(data, token) {
  return Axios.post(cloudinaryUploadEndpoint, data)
    .then((res) => {
      const { url, public_id, signature } = res.data
      return { url, public_id, signature }
    })
    .catch((err) => console.log(err))
}
