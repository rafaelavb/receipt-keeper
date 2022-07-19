import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
import { calculateExpiryDate } from '../helperFunctions'
import { updateReceipt } from '../actions'

const cloudinaryPreset = 'receipts_keepers'

const periods = ['year(s)', 'month(s)', 'week(s)', 'day(s)']

export default function EditReceipt({
  currentReceipt: receipt,
  modalState,
  close,
  closeView,
}) {
  const token = useSelector((state) => state.loggedInUser.token)
  const categories = useSelector((state) => state.categories?.data)
  const dispatch = useDispatch()
  const [name, setName] = useState(receipt.name)
  const [price, setPrice] = useState(receipt.price)
  const [note, setNote] = useState(
    receipt.note && receipt.note ? receipt.note : ''
  )
  const [categoryType, setCategoryType] = useState(
    receipt.categoryType ? receipt.categoryType : ''
  )
  const [store, setStore] = useState(receipt.store)
  const [purchaseDate, setPurchaseDate] = useState(
    new Date(receipt.purchaseDate)
  )
  const [warrantyChecked, setWarrantyChecked] = useState(
    receipt.expiryDate ? true : false
  )
  const [expiryDate, setExpiryDate] = useState(
    receipt.warrantyId ? receipt.expiryDate : ''
  )
  const [period, setPeriod] = useState(
    receipt.warrantyPeriod ? receipt.warrantyPeriod : ''
  )
  const [periodUnit, setPeriodUnit] = useState(
    receipt.warrantyPeriodUnit ? receipt.warrantyPeriodUni : ''
  )
  const [image, setImage] = useState(receipt.image.url)
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

  function changeImage(changedImage) {
    setImage(changedImage)
  }

  useEffect(() => {
    setExpiryDate(calculateExpiryDate(purchaseDate, period, periodUnit))
  }, [purchaseDate, period, periodUnit])

  async function handleEdit(e) {
    e.preventDefault()
    if (image && name && price && store) {
      const { categoryId: actualCategoryId } = categories.find(
        (category) => category.categoryType === categoryType
      )
      let updated
      if (image === receipt.image || image === receipt.image.url) {
        updated = {
          id: receipt.id,
          name,
          image: JSON.stringify(receipt.image),
          purchaseDate,
          store,
          price,
          categoryId: actualCategoryId,
          note,
          warrantyId: receipt.warrantyId,
          expiryDate,
          warrantyPeriod: period,
          warrantyPeriodUnit: periodUnit,
        }
      } else {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', cloudinaryPreset)
        const imageObj = await uploadImageToCloudinary(formData)
        const imageInfo = JSON.stringify(imageObj)
        updated = {
          id: receipt.id,
          name,
          image: imageInfo,
          purchaseDate,
          store,
          price,
          categoryId: actualCategoryId,
          note,
          warrantyId: receipt.warrantyId,
          expiryDate,
          warrantyPeriod: period,
          warrantyPeriodUnit: periodUnit,
        }
      }
      dispatch(updateReceipt(updated, token))
        .then(() => {
          close(e)
          closeView(e)
        })
        .catch((err) => {
          console.error(err)
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
        close(e)
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
              changeImage={changeImage}
            />
          </IconButton>
        )}
        <TextField
          required
          id="receipt-name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          id="category"
          label="Category"
          select
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
        >
          {categories?.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryType}>
              {category.categoryType}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="receipt-store"
          label="Store"
          variant="outlined"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />
        <TextField
          id="note"
          label="Note"
          multiline
          rows={2}
          placeholder="Enter your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
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
        <Button variant="contained" type="submit" onClick={handleEdit}>
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
