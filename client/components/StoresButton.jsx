import React, { useState } from 'react'
import {
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material'
import { Storefront } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'

export default function StoresButton() {
  const { username } = useParams()

  const stores = [
    'Countdown',
    'Noel Leeming',
    'PB Tech',
    'Pak n Save',
    'Harvey Norman',
  ] // need to delete hardcoded array for stores
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(false)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(false)
  }
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      <Tooltip title="Stores List">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: '2px', width: '50px', height: '50px' }}
        >
          <Storefront fontSize="large" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link
          to={`/receipts/${username}`}
          style={{ textDecoration: 'none', color: 'gray' }}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">All Stores</Typography>
          </MenuItem>
        </Link>
        {stores?.map((store, index) => (
          <Link
            to={`/receipts/${username}/${store}`}
            style={{ textDecoration: 'none', color: 'gray' }}
            key={index}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{store}</Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  )
}
