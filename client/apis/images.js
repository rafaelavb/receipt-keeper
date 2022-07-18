import request from 'superagent'
// import sha1 from 'sha1'

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

export function uploadImageToCloudinary(image) {
  // console.log('api', image.name)
  // const string = JSON.stringify(image.file)
  // console.log(string)
  return request
    .post('/api/v1/images')
    .attach('file', image)
    .then((res) => {
      console.log(res.body)
    })
}

export function uploadImageToCloudinary2(image) {
  const cloudName = 'receipt-keepers'
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  // const timestamp = Date.now() / 1000
  const uploadPreset = 'receipts_keepers'
  // const paramStr = `timestamp='${timestamp}'&upload_preset='${uploadPreset}"ZoD3Vr3GEPRLq3dZdZCaiJbuwCY`
  // const signature = sha1(paramStr)

  const params = {
    api_key: '428255634267578',
    // timestamp: timestamp,
    upload_preset: uploadPreset,
    // signature: signature,
    // file: image,
  }
  let uploadRequest = request.post(url)
  uploadRequest.attach('file', image)
  Object.keys(params).forEach((key) => {
    uploadRequest.field(key, params[key]) //field is specific to superagent
    uploadRequest.end((err, resp) => {
      //'end' sends the request
      if (err) {
        console.log(err, null)
        return
      }
      console.log(resp.data)
      // const url = resp.body.url
      // const ind = url.indexOf('upload/')
      // const newUrl =
      //   url.slice(0, ind + 7) + 'w_300/e_cartoonify/' + url.slice(ind + 7)
      // this.setState({
      //   imageUrl: [...this.state.imageUrl, newUrl],
    })
  })
}

//   return Axios.post(image))
//     .then((res) => {
//       const { url, public_id, signature } = res.data
//       return { url, public_id, signature }
//     })
//     .catch((err) => console.log(err))
// }
// }

// uploadFile(files) { //plural files
//     const image = files[0]; //assuming we are uploading one file at a time;

//     //normally, an upload str is requested for authentication, but cloudinary deviates from the standard
//     //of doing so. not good. s3 is more secure - requires authorization so more secure

//     //cloudName, url, timestamp, uploadPreset will all be packaged into the upload request
//     const cloudName = 'noorulain'; //uniquely identifies account

//     //constant string for uploading
//     //resource type can be many. image/pdf/video
//     const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

//     //requires a timestamp in seconds, so its necessary to divide by 1000
//     const timestamp = Date.now()/1000;

//     //found in settings as well
//     const uploadPreset = "receipts_keepers";

//     //next create a parameter string
//     //everything is in key:value pairs - it is a url param
//     const paramStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+"ZoD3Vr3GEPRLq3dZdZCaiJbuwCY"

//     //next encrypt using sha1 encryption --sha1 is a function
//     //this converts paramStr to sha1 signature --encrypted str is what goes to cloudinary
//     //it is their form of security
//     const signature = sha1(paramStr);

//     //prepare jSon with params

//     const params = {
//         'api_key': "493184569883823",
//         'timestamp' : timestamp,
//         'upload_preset': "pvfhdtk2",
//         'signature' : signature
//     }

//     //********************READY TO UPLOAD FILE USING ABOVE INFORMATION **********************/
//     //i am using superagent because i was having difficulty using axios
//     //superagent documentation isn't difficult to understand
//     //https://visionmedia.github.io/superagent/ ---reference if notes aren't clear

//     let uploadRequest = superagent.post(url); //request made
//     //cloudinary requirement to name the file 'file'
//     //key has to be file and the value is an image
//     uploadRequest.attach('file', image) // upload file //attach is specific to superagent

//     //for every upload request, we are sending the key:value from params --
//     //loop created in the event we decide to allow users to upload multiple images.
//     Object.keys(params).forEach((key) => {
//         uploadRequest.field(key, params[key]) //field is specific to superagent
//     })

//     uploadRequest.end((err, resp) => { //'end' sends the request
//         if(err){
//             console.log(err, null)
//             return
//         }
//         const url = resp.body.url
//         const ind = url.indexOf('upload/')
//         const newUrl = url.slice(0,ind+7) + 'w_300/e_cartoonify/' + url.slice(ind+7)
//         this.setState({
//             imageUrl: [...this.state.imageUrl, newUrl]
//         })
//     })
// }

//deliver images dynamically so you're not delivering all images at once
//adding parameters to the image url will deliver a big/small image
//same image can have different request depending on where its being rendered
//for example, an image can be rendered small if it needs to be a thumbnail
//and it can be rendered as a size that takes up the whole screen depending
//on the view port
//the size of the image corresponds to the amount of data that will be required
//to render the image
//Unsigned image uploading enabled allows bypassing of local server -- unnecessary step
//it will keep the server load down
//eliminates server from extra processing requests
