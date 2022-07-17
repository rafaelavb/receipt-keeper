import { CalendarMonth, Image } from '@mui/icons-material'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material'
import React, { useState } from 'react'
import ViewReceipt from './ViewReceipt'

export default function Receipt(props) {
  const { receipt } = props
  const [modalOpen, setModalOpen] = useState(false)

  function handleClickOpen(e) {
    e.preventDefault()
    setModalOpen(true)
  }

  function handleClose(e, bool) {
    e.preventDefault()
    setModalOpen(bool)
  }
  return (
    <>
      {receipt && (
        <>
          <Card
            sx={{
              width: 300,
              textAlign: 'center',
              marginLeft: { xs: 'auto', sm: '50px' },
              marginRight: { xs: 'auto', sm: '50px' },
            }}
            onClick={handleClickOpen}
          >
            <CardHeader
              title={receipt.name}
              subheader={
                <IconButton disabled>
                  <CalendarMonth />{' '}
                  {new Date(receipt.purchaseDate).toLocaleDateString('en-NZ')}
                </IconButton>
              }
            />
            <CardContent>
              <Typography>{receipt.store}</Typography>
            </CardContent>
            {receipt.image ? (
              <CardMedia
                component="img"
                height="194"
                image={receipt.image}
                alt={receipt.name}
              />
            ) : (
              <Box>
                <Image color="gray" />
              </Box>
            )}

            <CardContent height={'110px'}>
              {receipt.note && receipt.note !== 'none' ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: 'italic' }}
                  height="20px"
                >
                  {`"${receipt.note}"`}
                </Typography>
              ) : null}

              {receipt.expiryDate ? (
                <>
                  <Typography variant="body1" color="text.primary">
                    Warranty expired on
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {new Date(receipt.expiryDate).toLocaleDateString('en-NZ')}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" color="text.primary">
                  No Warranty
                </Typography>
              )}
            </CardContent>
          </Card>
          <ViewReceipt
            currentReceipt={receipt}
            modalState={modalOpen}
            close={handleClose}
          />
        </>
      )}
    </>
  )
}
