import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack } from '@mui/material'

import Sidebar from './Sidebar'
import Receipts from './Receipts'
import StoresButton from './StoresButton'
import { fetchReceipts, fetchCategories } from '../actions'

export default function Main() {
  const token = useSelector((state) => state.loggedInUser.token)
  const receipts = useSelector((state) => state.receipts.data)
  const [stores, setStores] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchReceipts(token))
      dispatch(fetchCategories())
    }
  }, [token])

  useEffect(() => {
    if (receipts) {
      const storesList = receipts.map((receipt) => receipt?.store)
      setStores(storesList)
    }
  }, [receipts])

  return (
    <Box>
      {stores && (
        <>
          <StoresButton stores={stores} />
          <Stack direction="row">
            <Sidebar stores={stores} />
            <Receipts />
          </Stack>
        </>
      )}
    </Box>
  )
}
