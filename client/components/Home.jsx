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

  useEffect(async () => {
    if (loggedInUser.token) {
      try {
        const username = await getUsername(loggedInUser.token)
        username && navigate(`/receipts/${username}`)
      } catch (err) {
        console.error(err)
      }
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
