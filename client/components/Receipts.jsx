import { Box, Stack } from '@mui/material'
import React from 'react'

import Receipt from './Receipt'

export default function Receipts() {
  const receipts = [
    {
      id: 1,
      auth0Id: 'auth0|62ce51224e478f1e65cfb444',
      userName: 'Lauren',
      name: 'Toaster',
      image:
        'https://thumbs.dreamstime.com/b/vector-paper-check-sell-receipt-bill-template-vector-paper-cash-sell-receipt-139437685.jpg',
      purchase_date: new Date('2022', '6', '11').toLocaleDateString('en-NZ'),
      store: 'Noel Leeming',
      price: 108.5,
      categoryId: 1,
      note: 'bought a toaster for office',
      categoryType: 'appliance',
      warrantyId: 1,
      expiryDate: new Date('2023', '6', '11').toLocaleDateString('en-NZ'),
    },
    {
      id: 2,
      auth0Id: 'auth0|62ce51224e478f1e65cfb444',
      userName: 'Lauren',
      name: 'Hair dryer',
      image:
        'https://thumbs.dreamstime.com/b/vector-paper-check-sell-receipt-bill-template-vector-paper-cash-sell-receipt-139437685.jpg',
      purchase_date: new Date('2022', '4', '11').toLocaleDateString('en-NZ'),
      store: 'Harvey Norman',
      price: 65.99,
      categoryId: 1,
      note: undefined,
      categoryType: 'appliance',
      warrantyId: 2,
      expiryDate: new Date('2024', '4', '11').toLocaleDateString('en-NZ'),
    },
  ]
  return (
    <Box bgcolor="pink" flex={5} p={2}>
      <Stack direction="row" col={3}>
        {receipts?.map((receipt, index) => {
          return <Receipt key={index} receipt={receipt} />
        })}
      </Stack>
    </Box>
  )
}
