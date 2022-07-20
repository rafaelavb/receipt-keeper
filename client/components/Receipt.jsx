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
            role="receiptCard"
            sx={{
              width: 300,
              textAlign: 'center',
              marginLeft: { xs: 'auto', sm: '50px' },
              marginRight: { xs: 'auto', sm: '50px' },
              opacity: expired ? '0.65' : '1',
              boxShadow:
                '5px 5px 5px 1px rgb(0 0 0 / 20%), 5px 5px 5px 5px rgb(0 0 0 / 14%), 5px 5px 5px 5px rgb(0 0 0 / 12%)',
            }}
            onClick={handleClickOpen}
          >
            <CardHeader
              role="display-receipt-name"
              aria-describedby="card-display-receipt-name"
              sx={{ width: '250px', marginLeft: 'auto', marginRight: 'auto' }}
              title={
                <Box
                  sx={{
                    width: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {receipt.name}
                </Box>
              }
              subheader={
                <IconButton
                  disabled
                  role="display-receipt-purchaseDate"
                  aria-describedby="card-display-receipt-purchaseDate"
                >
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
              <Typography
                role="display-store"
                aria-describedby="card-display-store"
              >
                {receipt.store}
              </Typography>
              <Typography
                role="display-price"
                aria-describedby="card-display-price"
              >
                $ {receipt.price}
              </Typography>
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

            <CardContent
              sx={{
                width: '250px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {receipt.note && receipt.note !== 'none' ? (
                <Box
                  role="display-note"
                  aria-describedby="card-display-note"
                  component="div"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontStyle: 'italic',
                    height: '20px',
                    width: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {`"${receipt.note}"`}
                </Box>
              ) : null}
              <Box
                role="display-warranty"
                aria-describedby="card-display-warranty"
              >
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
                      {new Date(receipt.expiryDate).toLocaleDateString(
                        'en-NZ',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }
                      )}
                      &nbsp;
                      <span>{expired ? '(expired)' : ''}</span>
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" color="text.primary">
                    No Warranty
                  </Typography>
                )}
              </Box>
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
