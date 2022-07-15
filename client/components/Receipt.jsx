import {
  CalendarMonth,
  Favorite,
  Image,
  MoreVert,
  Share,
} from '@mui/icons-material'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
} from '@mui/material'
import React, { useEffect } from 'react'

export default function Receipt(props) {
  const { receipt } = props
  useEffect(() => {}, [])

  return (
    <Card
      sx={{
        width: 300,
        textAlign: 'center',
        marginLeft: { xs: 'auto', sm: '50px' },
        marginRight: { xs: 'auto', sm: '50px' },
      }}
    >
      <CardHeader
        title={receipt.name}
        subheader={
          <IconButton disabled>
            <CalendarMonth /> {receipt.purchaseDate}
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
        {receipt.note ? (
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
              {receipt.expiryDate}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" color="text.primary">
            No Warranty
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
