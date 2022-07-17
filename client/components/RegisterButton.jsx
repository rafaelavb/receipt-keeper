import React from 'react'

import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
// import IconButton from '@mui/material/IconButton'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export default function RegisterButton() {
  return (
    <div>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      ></Typography>

      <Button type="submit" color="primary">
        Register
      </Button>
    </div>
  )
}
