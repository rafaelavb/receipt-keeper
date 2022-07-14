import React from 'react'
import Sidebar from './Sidebar'
import Receipts from './Receipts'
import { Box, Stack } from '@mui/material'
import StoresButton from './StoresButton'

export default function Main() {
  return (
    <Box>
      <StoresButton />
      <Stack direction="row">
        <Sidebar />
        <Receipts />
      </Stack>
    </Box>
  )
}
