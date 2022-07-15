import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack } from '@mui/material'
import { fetchReceipts } from '../actions/receipts'

import Receipt from './Receipt'
import AddReceipt from './AddReceipt'

export default function Receipts(props) {
  const { store } = useParams()
  const receipts = useSelector((state) => state.receipts.data)
  const token = useSelector((state) => state.loggedInUser.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchReceipts(token))
    }
  }, [token])

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
