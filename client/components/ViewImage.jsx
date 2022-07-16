import React, { useState, useEffect } from 'react'
import { Box, Button, Modal, styled, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

export default function ViewImage({ viewImageMode, setViewMode, image }) {
  return (
    <StyledModal
      open={viewImageMode}
      onClose={setViewMode}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          '& .MuiTextField-root': { my: 0.5, width: '100%' },
          '& > :not(style)': { my: 0.5, width: '100%' },
          width: { xs: '250px', sm: '400px', md: '400px' },
          height: { xs: '500px', sm: '600px', md: '600px' },
        }}
        bgcolor="white"
        p={3}
        borderRadius={5}
      >
        <Button onClick={setViewMode}>
          <Close />
        </Button>

        <img src={image} />
      </Box>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
