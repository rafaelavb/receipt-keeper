import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Stack } from '@mui/material'
import Sidebar from './Sidebar'
import Receipts from './Receipts'
import StoresButton from './StoresButton'

export default function Main() {
  const receipts = useSelector((state) => state.receipts.data)

  return (
    <Box>
      <StoresButton receipts={receipts} />
      <Stack direction="row">
        <Sidebar receipts={receipts} />
        <Receipts receipts={receipts} />
      </Stack>
    </Box>
  )
}
