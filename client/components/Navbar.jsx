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
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar(props) {
  const { logout, loginWithRedirect } = useAuth0()
  const { home } = props
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  function handleLogout(e) {
    e.preventDefault()
    logout().then((res) => handleCloseUserMenu())
  }

  async function handleLogin(e) {
    e.preventDefault()
    handleCloseUserMenu()
    try {
      await loginWithRedirect()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AppBar position="sticky" sx={{ height: '65p' }}>
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '&:hover': { cursor: 'pointer' },
          }}
        >
          Receipt Keeper
        </Typography>
        <ReceiptLong sx={{ display: { xs: 'block', sm: 'none' } }} />
        {!home && (
          <SearchField>
            <InputBase placeholder="Search..." />
          </SearchField>
        )}
        <MenuIcon onClick={handleOpenUserMenu}></MenuIcon>
        <Menu
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <IfAuthenticated>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <MenuItem onClick={handleLogin}>Log In</MenuItem>
          </IfNotAuthenticated>
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
