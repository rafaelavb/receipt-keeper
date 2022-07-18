import Axios from 'axios'

//axios is fine but I would use it or superagent, not both
const cloudinaryUploadEndpoint =
  'https://api.cloudinary.com/v1_1/receipt-keepers/image/upload'

export function uploadImageToCloudinary(data) {
  return Axios.post(cloudinaryUploadEndpoint, data)
    .then((res) => {
      const { url, public_id, signature } = res.data
      return { url, public_id, signature }
    })
    .catch((err) => console.log(err))
}
