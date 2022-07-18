import React, { useState } from 'react'
import { Fab, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import AddReceiptForm from './AddReceiptForm'

export default function AddReceipt() {
  const [modalOpen, setModalOpen] = useState(false)

  function handleClickOpen(e) {
    e.preventDefault()
    setModalOpen(true)
  }

  function handleClose(e) {
    e.preventDefault()
    setModalOpen(false)
  }

  return (
    <>
      <Tooltip
        title="Add"
        sx={{
          position: 'fixed',
          bottom: '30px',
          right: { xs: 'calc(50%)', sm: 'calc(50%)', md: '30px' },
        }}
      >
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <AddReceiptForm modalState={modalOpen} close={handleClose} />
    </>
  )
}
