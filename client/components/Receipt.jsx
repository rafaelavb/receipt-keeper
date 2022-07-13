import { Favorite, MoreVert, Share } from '@mui/icons-material'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material'
import React from 'react'
import { useEffect } from 'react'

export default function Receipt(props) {
  const { receipt } = props
  useEffect(() => {
    console.log(receipt)
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={receipt.name} subheader={receipt.purchase_date} />
      <CardMedia
        component="img"
        height="194"
        image={receipt.image}
        alt={receipt.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {receipt.note}
        </Typography>
        {receipt.expiryDate ? (
          <Typography variant="body2" color="text.secondary">
            Warranty expired on{receipt.expiryDate}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No Warranty for the purchase
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
