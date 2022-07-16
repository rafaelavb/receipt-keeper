import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Storefront } from '@mui/icons-material'
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material'

export default function Sidebar({ stores }) {
  const { username } = useParams()

  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: 'none', sm: 'block' }, minWidth: '190px' }}
    >
      <Box position="fixed">
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
    </Box>
  )
}
