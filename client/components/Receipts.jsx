import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Stack } from '@mui/material'

import Receipt from './Receipt'

export default function Receipts() {
  const { store } = useParams()
  const receipts = useSelector((state) => state.receipts.data)

  return (
    <Box
      flex={5}
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        margin={{ xs: 0, sm: 4 }}
        alignItems={{ xs: 'center' }}
        textAlign="center"
        flexWrap="wrap"
        gap={3}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
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
    </Box>
  )
}
