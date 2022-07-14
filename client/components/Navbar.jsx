import React, { useState } from 'react'
import {
  AppBar,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material'
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import MenuIcon from '@mui/icons-material/Menu'

import { ReceiptLong } from '@mui/icons-material/'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Receipt Keeper
        </Typography>
        <ReceiptLong sx={{ display: { xs: 'block', sm: 'none' } }} />
        <SearchField>
          <InputBase placeholder="Search..." />
        </SearchField>
        <MenuIcon onClick={(e) => setMenuOpen(true)}></MenuIcon>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={menuOpen}
          onClose={(e) => setMenuOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  )
}

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
})

const SearchField = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
}))
