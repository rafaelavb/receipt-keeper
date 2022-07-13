import React from 'react'
import Sidebar from './Sidebar'
import Receipts from './Receipts'
import { useParams } from 'react-router-dom'
import { Box, Stack } from '@mui/material'

export default function Main() {
  const { username } = useParams()
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Receipts />
      </Stack>
    </Box>
  )
}
