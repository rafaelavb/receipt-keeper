const express = require('express')
const router = express.Router()

// const dotenv = require('dotenv')
// dotenv.config()
const cloudinary = require('cloudinary').v2

router.post('/', (req, res) => {
  const image = req.files.file.data
    .toString('base64')
    .replace(/(\r\n|\n|\r)/gm, '')

  const cloudinaryPreset = process.env.CLOUDINARY_PRESET
  cloudinary.uploader
    .upload(`data:image/jpeg;base64,${image}`, {
      upload_preset: cloudinaryPreset,
    })
    .then((result) => {
      const { url, public_id, signature } = result
      res.send({ url, public_id, signature })
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = router
