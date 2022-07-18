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
import React, { useState, useEffect } from 'react'
import ViewReceipt from './ViewReceipt'

export default function Receipt(props) {
  const { receipt } = props
  const [modalOpen, setModalOpen] = useState(false)
  const [expired, setExpired] = useState(false)
  useEffect(() => {
    if (receipt.expiryDate) {
      setExpired(new Date(receipt.expiryDate) < new Date())
    }
  }, [receipt.expiryDate])

  function handleClickOpen(e) {
    e.preventDefault()
    setModalOpen(true)
  }

  function handleClose(e) {
    e.preventDefault()
    setModalOpen(false)
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
              opacity: expired ? '0.7' : '1',
            }}
            onClick={handleClickOpen}
          >
            <CardHeader
              title={receipt.name}
              subheader={
                <IconButton disabled>
                  <CalendarMonth />
                  {new Date(receipt.purchaseDate).toLocaleDateString('en-NZ', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </IconButton>
              }
            />
            <CardContent>
              <Typography>{receipt.store}</Typography>
              <Typography>$ {receipt.price}</Typography>
            </CardContent>

            {receipt.image ? (
              <CardMedia
                component="img"
                height="194"
                image={receipt.image.url}
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
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ textDecoration: expired ? 'line-through' : 'none' }}
                  >
                    {new Date(receipt.expiryDate).toLocaleDateString('en-NZ', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                    &nbsp;
                    <span>{expired ? '(expired)' : ''}</span>
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
