import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { PhotoCamera, ReceiptLong } from '@mui/icons-material'

import { uploadImageToCloudinary } from '../apis'
const cloudinaryPreset = 'receipts_keepers'

import Preview from './Preview'
import { calculateExpiryDate } from '../helperFunctions'
import { fetchCategories } from '../actions'

// const categories = [
//   'Books',
//   'Clothing',
//   'Electronics',
//   'Food',
//   'Homeware',
//   'Jewellery',
// ]

const periods = ['year(s)', 'month(s)', 'week(s)', 'day(s)']

export default function AddReceiptForm({ modalState, close }) {
  const token = useSelector((state) => state.loggedInUser.token)
  const categories = useSelector((state) => state.categories.data)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(new Date())
  const [store, setStore] = useState('')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [warrantyChecked, setWarrantyChecked] = useState(false)
  const [period, setPeriod] = useState('')
  const [periodUnit, setPeriodUnit] = useState('year(s)')
  const [image, setImage] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)
  const dispatch = useDispatch()

  const [newReceipt, setNewReceipt] = useState({
    name: '',
    image: '',
    price: '',
    purchaseDate: new Date(),
    store: '',
    category: '',
    note: '',
    expiryDate: null,
    warrantyPeriod: null,
    warrantyPeriodUnit: null,
  })

  // const newReceipt = {
  //   name,
  //   image: imageInfo,
  //   price,
  //   purchaseDate,
  //   store,
  //   category: category ? category : 'none',
  //   note: note ? note : 'none',
  //   expiryDate: warrantyChecked ? expiryDate : null,
  //   warrantyPeriod: warrantyChecked ? period : null,
  //   warrantyPeriodUnit: warrantyChecked ? periodUnit : null,
  // }

  useEffect(() => {
    if (token) {
      dispatch(fetchCategories(token))
    }
  }, [token])

  function handleImageChange(e) {
    e.preventDefault()
    const file = e.target.files[0]
    setImage(file)
  }

  function setImagePreview(e) {
    e.preventDefault()
    setPreviewMode(!previewMode)
  }

  function resetImage() {
    setImage(null)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const expiryDate =
      warrantyChecked && purchaseDate && period && periodUnit
        ? calculateExpiryDate(purchaseDate, period, periodUnit)
        : null
    console.log(expiryDate)

    if (image && name && price && store) {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', cloudinaryPreset)
      return uploadImageToCloudinary(formData).then((res) => {
        console.log(res)
        const imageInfo = JSON.stringify(res)
        // const newReceipt = {
        //   name,
        //   image: imageInfo,
        //   purchaseDate,
        //   store,
        //   price,
        //   category: category ? category : 'none',
        //   note: note ? note : 'none',
        //   expiryDate: warrantyChecked ? expiryDate : null,
        //   warrantyPeriod: warrantyChecked ? period : null,
        //   warrantyPeriodUnit: warrantyChecked ? periodUnit : null,
        // }
      })
    }
  }

  return (
    <StyledModal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={modalState}
      onClose={(e) => {
        setWarrantyChecked(false)
        close(e, false)
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 0.5, width: '100%' },
          '& > :not(style)': { my: 0.5, width: '100%' },
          width: { xs: '250px', sm: '400px', md: '400px' },
          height: { xs: '500px', sm: '600px', md: '600px' },
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        bgcolor="white"
        p={3}
        borderRadius={5}
      >
        <Typography variant="h6" color="primary" textAlign="center">
          New Receipt
        </Typography>
        {!image && (
          <IconButton
            color="primary"
            component="label"
            sx={{ width: '50px', height: '50px' }}
          >
            <input
              required
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
            <PhotoCamera />
          </IconButton>
        )}
        {image && (
          <IconButton
            color="primary"
            component="label"
            sx={{ width: '50px' }}
            onClick={setImagePreview}
          >
            <ReceiptLong />
            <Preview
              previewMode={previewMode}
              setImagePreview={setImagePreview}
              image={image}
              resetImage={resetImage}
            />
          </IconButton>
        )}

        {/* Receipt Name */}
        <TextField
          required
          id="receipt-name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Price */}
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            type="number"
            step={1.01}
            required
            id="price"
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

        {/* Purchase Date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            required
            disableFuture
            label="Purchase Date"
            openTo="year"
            views={['year', 'month', 'day']}
            inputFormat="dd/MM/yyyy"
            value={purchaseDate}
            onChange={(newDate) => {
              setPurchaseDate(newDate)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* Store */}
        <TextField
          required
          id="receipt-store"
          label="Store"
          variant="outlined"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />

        {/* Category */}
        <TextField
          id="category"
          label="Category"
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryType} value={category.categoryType}>
              {category.categoryType}
            </MenuItem>
          ))}
        </TextField>

        {/* Note */}
        <TextField
          id="note"
          label="Note"
          multiline
          rows={2}
          placeholder="Enter your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Warranty */}
        <FormGroup sx={{ alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={warrantyChecked}
                onChange={() => {
                  setWarrantyChecked(!warrantyChecked)
                }}
              />
            }
            label="Warranty"
          />
        </FormGroup>

        {/* Warranty Period */}
        {warrantyChecked && (
          <Grid container>
            <Grid item xs={8}>
              <TextField
                id="warranty-duration"
                label="Warranty"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="warranty-period"
                label=""
                select
                value={periodUnit}
                onChange={(e) => setPeriodUnit(e.target.value)}
              >
                {periods.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        )}

        {/* Add Button */}
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </Box>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
