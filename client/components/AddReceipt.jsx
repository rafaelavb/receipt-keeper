import React, { useState } from 'react'
import { Box, Fab, Tooltip } from '@mui/material'
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
        className="here2"
        title="Add"
        sx={{
          position: 'fixed',
          bottom: { xs: 30, md: 40 },
          right: { xs: 'calc(50% - 25px)', md: '40px' },
          width: { xs: '50px', md: '70px' },
          height: { xs: '50px', md: '70px' },
        }}
      >
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: { xs: '30px', sm: '50px' },
              height: { xs: '30px', sm: '50px' },
            }}
          />
        </Fab>
      </Tooltip>
      <AddReceiptForm modalState={modalOpen} close={handleClose} />
    </>
  )
}
