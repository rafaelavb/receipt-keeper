const express = require('express')
const router = express.Router()
const request = require('superagent')
const sha1 = require('sha1')

router.post('/', (req, res) => {
  console.log('here')
  const data = req
  console.log(data)

  // const cloudName = 'receipt-keepers'
  // const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  // const timestamp = Date.now() / 1000
  // const uploadPreset = 'receipts_keepers'
  // const paramStr = `timestamp='${timestamp}'&upload_preset='${uploadPreset}"ZoD3Vr3GEPRLq3dZdZCaiJbuwCY`
  // const signature = sha1(paramStr)

  // const params = {
  //   api_key: '428255634267578',
  //   timestamp: timestamp,
  //   upload_preset: uploadPreset,
  //   signature: signature,
  //   // file: image,
  // }
  // let uploadRequest = request.post(url)
  // uploadRequest.attach('file', image)
  // Object.keys(params).forEach((key) => {
  //   uploadRequest.field(key, params[key]) //field is specific to superagent
  //   uploadRequest.end((err, resp) => {
  //     //'end' sends the request
  //     if (err) {
  //       // console.log(err, null)
  //       return
  //     }
  //     // console.log(resp.body)
  //   })
  // })
})

module.exports = router
