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

  //AddReceiptForm always calls this function with bool as false
  //looks like that argument is not needed any more and you can just hard code it to false on line 19
  function handleClose(e, bool) {
    e.preventDefault()
    setModalOpen(bool)
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
