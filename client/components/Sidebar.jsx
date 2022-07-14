import { Storefront } from '@mui/icons-material'
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material'
import React from 'react'

import { Link, useParams } from 'react-router-dom'

export default function Sidebar() {
  const { username } = useParams()
  const stores = [
    'Countdown',
    'Noel Leeming',
    'PB Tech',
    'Pak n Save',
    'Harvey Norman',
  ] // need to delete hardcoded array for stores
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <List>
        <Link
          to={`/receipts/${username}`}
          style={{ textDecoration: 'none', color: 'gray' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary={'All Stores'} />
            </ListItemButton>
          </ListItem>
        </Link>
        {stores?.map((store, index) => {
          return (
            <Link
              to={`/receipts/${username}/${store}`}
              style={{ textDecoration: 'none', color: 'gray' }}
              key={index}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Storefront />
                  </ListItemIcon>
                  <ListItemText primary={store} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </Box>
  )
}
