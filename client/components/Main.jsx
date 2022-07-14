import React from 'react'
import Sidebar from './Sidebar'
import Receipts from './Receipts'
import { Box, Stack } from '@mui/material'

export default function Main() {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Receipts />
      </Stack>
    </Box>
  )
}
