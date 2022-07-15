import { Box, Stack } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

import Receipt from './Receipt'
import AddReceipt from './AddReceipt'

export default function Receipts(props) {
  const { store } = useParams()
  const receipts = [
    {
      id: 1,
      auth0Id: 'auth0|62ce51224e478f1e65cfb444',
      username: 'Lauren',
      name: 'Toaster',
      image:
        'https://thumbs.dreamstime.com/b/vector-paper-check-sell-receipt-bill-template-vector-paper-cash-sell-receipt-139437685.jpg',
      purchaseDate: new Date('2022', '6', '11').toLocaleDateString('en-NZ'),
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
      username: 'Lauren',
      name: 'Hair dryer',
      image:
        'https://thumbs.dreamstime.com/b/vector-paper-check-sell-receipt-bill-template-vector-paper-cash-sell-receipt-139437685.jpg',
      purchaseDate: new Date('2022', '4', '11').toLocaleDateString('en-NZ'),
      store: 'Harvey Norman',
      price: 65.99,
      categoryId: 1,
      categoryType: 'appliance',
    },
    {
      id: 3,
      auth0Id: 'auth0|62ce51224e478f1e65cfb444',
      username: 'Lauren',
      name: 'Toaster',
      image:
        'https://thumbs.dreamstime.com/b/vector-paper-check-sell-receipt-bill-template-vector-paper-cash-sell-receipt-139437685.jpg',
      purchaseDate: new Date('2022', '6', '11').toLocaleDateString('en-NZ'),
      store: 'Noel Leeming',
      price: 108.5,
      categoryId: 1,
      note: 'bought a toaster for office',
      categoryType: 'appliance',
      warrantyId: 3,
      expiryDate: new Date('2023', '6', '11').toLocaleDateString('en-NZ'),
    },
    {
      id: 4,
      auth0Id: 'auth0|62ce51224e478f1e65cfb444',
      username: 'Lauren',
      name: 'Hair dryer',
      image:
        'https://thumbs.dreamstime.com/b/vector-paper-check-sell-receipt-bill-template-vector-paper-cash-sell-receipt-139437685.jpg',
      purchaseDate: new Date('2022', '4', '11').toLocaleDateString('en-NZ'),
      store: 'Harvey Norman',
      price: 65.99,
      categoryId: 1,
      note: undefined,
      categoryType: 'appliance',
      warrantyId: 4,
      expiryDate: new Date('2024', '4', '11').toLocaleDateString('en-NZ'),
    },
  ]
  // need to delete the hardcoded array (redux)

  return (
    <Box flex={5}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        margin={{ xs: 0, sm: 4 }}
        alignItems={{ xs: 'center' }}
        textAlign="center"
        flexWrap="wrap"
        gap={3}
      >
        {!store &&
          receipts?.map((receipt, index) => {
            return <Receipt key={index} receipt={receipt} />
          })}

        {store &&
          receipts?.map((receipt, index) => {
            return receipt.store === store ? (
              <Receipt key={index} receipt={receipt} />
            ) : (
              <Box key={index}></Box>
            )
          })}
      </Stack>
      <AddReceipt />
    </Box>
  )
}
