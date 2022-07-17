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
import { createReceipt } from '../actions'

const periods = ['year(s)', 'month(s)', 'week(s)', 'day(s)']
const blankReceipt = {
  name: '',
  price: '',
  purchaseDate: '',
  store: '',
  categoryId: 0,
  categoryType: '',
  note: '',
  expiryDate: '',
  warrantyPeriod: '',
  warrantyPeriodUnit: '',
}

export default function AddReceiptForm({ modalState, close }) {
  const token = useSelector((state) => state.loggedInUser.token)
  const categories = useSelector((state) => state.categories?.data)
  const [purchaseDate, setPurchaseDate] = useState(new Date())
  const [warrantyChecked, setWarrantyChecked] = useState(false)
  const [image, setImage] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)
  const dispatch = useDispatch()
  const [newReceipt, setNewReceipt] = useState(blankReceipt)
  const [errorMessage, setErrorMessage] = useState(null)

  function handleReceiptChange(e) {
    const { name, value } = e.target
    setNewReceipt({
      ...newReceipt,
      [name]: value,
      purchaseDate,
    })
  }

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

    newReceipt.expiryDate =
      warrantyChecked &&
      purchaseDate &&
      newReceipt.warrantyPeriod &&
      newReceipt.warrantyPeriodUnit
        ? calculateExpiryDate(
            purchaseDate,
            newReceipt.warrantyPeriod,
            newReceipt.warrantyPeriodUnit
          )
        : null

    if (image && newReceipt.name && newReceipt.price && newReceipt.store) {
      setErrorMessage('')
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', cloudinaryPreset)
      close(e, false)
      return uploadImageToCloudinary(formData).then((res) => {
        const imageInfo = JSON.stringify(res)
        const { categoryId: actualCategoryId } = categories.find((category) => {
          if (category.categoryType === newReceipt.categoryType) {
            return category.categoryId
          }
        })
        setNewReceipt({
          ...newReceipt,
          image: imageInfo,
          categoryId: actualCategoryId,
        })
      })
    } else {
      setErrorMessage(
        'You must add image of receipt and specify name, price, store to save your receipt'
      )
    }
  }

  useEffect(() => {
    if (newReceipt.image) {
      dispatch(createReceipt(newReceipt, token)).then(
        () => setNewReceipt(blankReceipt),
        setImage(null),
        setWarrantyChecked(false)
      )
    }
    return
  }, [newReceipt])

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

        {/* Image */}
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
          name="name"
          value={newReceipt.name}
          onChange={handleReceiptChange}
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
            name="price"
            value={newReceipt.price}
            onChange={handleReceiptChange}
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
            // name="purchaseDate"
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
          name="store"
          value={newReceipt.store}
          onChange={handleReceiptChange}
        />

        {/* Category */}
        <TextField
          id="category"
          label="Category"
          select
          name="categoryType"
          value={newReceipt.categoryType}
          onChange={handleReceiptChange}
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
          name="note"
          value={newReceipt.note}
          onChange={handleReceiptChange}
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
                id="warranty-period"
                label="Warranty"
                required
                type="number"
                name="warrantyPeriod"
                value={newReceipt.warrantyPeriod}
                onChange={handleReceiptChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="warranty-period-unit"
                label=""
                select
                name="warrantyPeriodUnit"
                value={newReceipt.warrantyPeriodUnit}
                onChange={handleReceiptChange}
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
        <Box textAlign="center" color="primary">
          {errorMessage}
        </Box>

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
