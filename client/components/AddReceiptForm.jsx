import React, { useState } from 'react'
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
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { PhotoCamera, ReceiptLong } from '@mui/icons-material'

import Preview from './Preview'

const cloudinaryPreset = 'nh01qzjk'

const categories = [
  'Books',
  'Clothing',
  'Electronics',
  'Food',
  'Homeware',
  'Jewellery',
]

const periods = ['year(s)', 'month(s)', 'week(s)', 'day(s)']

export default function AddReceiptForm({ modalState, close }) {
  const [category, setCategory] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(new Date())
  const [warrantyChecked, setWarrantyChecked] = useState(false)
  const [period, setPeriod] = useState('year(s)')

  const [image, setImage] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)

  function handleImageChange(e) {
    e.preventDefault()
    const file = e.target.files[0]
    setImage(file)
  }

  function resetImage() {
    setImage(null)
  }

  function setImagePreview(e) {
    e.preventDefault()
    setPreviewMode(!previewMode)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', cloudinaryPreset)
    // return uploadImag
  }

  return (
    <StyledModal
      open={modalState}
      onClose={(e) => {
        setWarrantyChecked(false)
        close(e, false)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 0.5, width: '100%' },
          '& > :not(style)': { my: 0.5, width: '100%' },
          width: { xs: '250px', sm: '400px', md: '400px' },
          height: { xs: '500px', sm: '600px', md: '600px' },
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
          // value={receipt.name}
          // onChange={handleChange}
        />

        {/* Price */}
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            type="decimal"
            step={0.01}
            required
            id="price"
            label="Price"
            // value={receipt.price}
            // onChange={handleChange}
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
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
          // value={receipt.note}
          // onChange={handleChange}
        />

        {/* Warranty */}
        <FormGroup sx={{ alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={warrantyChecked}
                onChange={(e) => {
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
              <TextField id="warranty-duration" label="Warranty" required />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="warranty-period"
                label=""
                select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                {periods.map((period) => (
                  <MenuItem key={period} value={period}>
                    {period}
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
