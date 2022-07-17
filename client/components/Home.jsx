import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { getUsername } from '../apis'

import { IfNotAuthenticated } from './Authenticated'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Arial', 'serif'].join(','),
    // fontFamily: ['Arial', 'sans-serif'].join(','),
    // fontFamily: ['Arial', 'monospace'].join(','),
    // fontFamily: ['Arial', 'cursive'].join(','),
    // fontFamily: ['Arial', 'fantasy'].join(','),
    // fontFamily: ['Chilanka', 'cursive'].join(','),
    // fontFamily: ['BlinkMacSystemFont', 'cursive'].join(','),
    // fontFamily: ['Segoe UI', 'cursive'].join(','),
    // fontFamily: ['-apple-system', 'monospace'].join(','),
    // fontFamily: ['Helvetica Neue', 'fantasy'].join(','),
    // fontFamily: ['Apple Color Emoji', 'cursive'].join(',')
    // fontFamily: ['Segoe UI Emoji', 'cursive'].join(',')
    // fontFamily: ['Segoe UI Symbol', 'cursive'].join(',')
    // fontFamily: ['Roboto', 'cursive'].join(',')
  },
})

export default function Home() {
  const { loginWithRedirect } = useAuth0()
  const navigate = useNavigate()
  const loggedInUser = useSelector((state) => state.loggedInUser)

  async function handleRegister(e) {
    e.preventDefault()
    await loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  useEffect(() => {
    if (loggedInUser.token) {
      getUsername(loggedInUser.token).then((username) => {
        if (username) {
          navigate(`/receipts/${username}`)
        }
      })
    }
  }, [loggedInUser])

  return (
    <div className="app">
      <IfNotAuthenticated>
        <ThemeProvider theme={theme}>
          <Box p={5}>
            <Typography variant="h2" color="textSecondary" align="center">
              We keep your receipts for when you need them
            </Typography>
          </Box>
        </ThemeProvider>

        <Box pd={3} textAlign="center">
          <Button variant="contained">
            <a
              style={{ color: 'white', textDecoration: 'none' }}
              href="/"
              onClick={handleRegister}
            >
              Register
            </a>
          </Button>
        </Box>
      </IfNotAuthenticated>
    </div>
  )
}

/* <body>
<div id="app"></div>
<script src="/bundle.js"></script>
<div><p>hello there how is it going</p></div>
</body> */
