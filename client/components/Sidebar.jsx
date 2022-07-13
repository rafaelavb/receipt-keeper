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

export default function Sidebar() {
  const stores = [
    'Countdown',
    'Noel Leeming',
    'PB Tech',
    'Pak n Save',
    'Harvey Norman',
  ] //
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <List>
        {stores?.map((store, index) => {
          return (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <Storefront />
                </ListItemIcon>
                <ListItemText primary={store} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
