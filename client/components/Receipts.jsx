import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack } from '@mui/material'

import Receipt from './Receipt'
import AddReceipt from './AddReceipt'

export default function Receipts({ receipts }) {
  const { store } = useParams()

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
      <AddReceipt receipts={receipts} />
    </Box>
  )
}
