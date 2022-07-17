import React, { useState, useEffect } from 'react'
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

import EditPreview from './EditPreview'

import { uploadImageToCloudinary } from '../apis'
import { useSelector } from 'react-redux'

import { calculateExpiryDate } from '../helperFunctions'

const cloudinaryPreset = 'receipts_keepers'

const categories = [
  'Books',
  'Clothing',
  'Electronics',
  'Food',
  'Homeware',
  'Jewellery',
]

const periods = ['year(s)', 'month(s)', 'week(s)', 'day(s)']

export default function EditReceipt({
  currentReceipt: receipt,
  modalState,
  close,
}) {
  const token = useSelector((state) => state.loggedInUser.token)
  const [name, setName] = useState(receipt.name)
  const [price, setPrice] = useState(receipt.price)
  const [note, setNote] = useState(receipt.note ? receipt.note : '')
  const [category, setCategory] = useState(
    receipt.category ? receipt.category : ''
  )
  const [store, setStore] = useState(receipt.store)
  const [purchaseDate, setPurchaseDate] = useState(
    new Date(receipt.purchaseDate)
  )
  const [warrantyChecked, setWarrantyChecked] = useState(
    receipt.warrantyId ? true : false
  )
  const [period, setPeriod] = useState(receipt.warrantyPeriod)
  const [periodUnit, setPeriodUnit] = useState(receipt.warrantyPeriodUnit)
  const [image, setImage] = useState(
    typeof receipt.image === 'object' ? receipt.image.url : receipt.image
  )
  const [previewMode, setPreviewMode] = useState(false)

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
      if (image === receipt.image || image === receipt.image.url) {
        const newReceipt = {
          name,
          image,
          purchaseDate,
          store,
          price,
          category: category ? category : 'none',
          note: note ? note : 'none',
          expiryDate,
        }
      } else {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', cloudinaryPreset)
        return uploadImageToCloudinary(formData).then((res) => {
          console.log(res)
          const imageInfo = JSON.stringify(res)
          const newReceipt = {
            name,
            image: imageInfo,
            purchaseDate,
            store,
            price,
            category: category ? category : 'none',
            note: note ? note : 'none',
            expiryDate,
          }
        })
      }
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
          Edit Receipt
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
            <EditPreview
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

        {/* Category */}
        <TextField
          id="category"
          label="Category"
          select
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        {/* Store */}
        <TextField
          required
          id="receipt-store"
          label="Store"
          variant="outlined"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />

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
          Edit
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
