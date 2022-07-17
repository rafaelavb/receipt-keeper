import React, { useState, useEffect } from 'react'
import { Box, Button, Modal, styled, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

export default function EditPreview({
  previewMode,
  setImagePreview,
  image,
  changeImage,
}) {
  const [preview, setPreview] = useState(null)
  useEffect(() => {
    if (image && typeof image === 'object') {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(image)
    }
  }, [])

  function handleReset(e) {
    e.preventDefault()
    changeImage(null)
    setImagePreview(e)
  }

  return (
    <StyledModal
      open={previewMode}
      onClose={setImagePreview}
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
        <Button onClick={setImagePreview}>
          <Close />
        </Button>

        <img src={typeof image === 'object' ? preview : image} />
        <Button onClick={(e) => handleReset(e)}>Reset</Button>
      </Box>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
