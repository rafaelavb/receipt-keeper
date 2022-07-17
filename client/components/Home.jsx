import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { getUsername } from '../apis'

import { IfNotAuthenticated } from './Authenticated'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

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
        <Box p={5}>
          <Typography variant="h1" color="textSecondary" align="center">
            We keep your receipts for when you need
          </Typography>
        </Box>

        <Box pd={3} textAlign="center">
          <Button variant="contained">
            <a
              sx={{ color: 'white' }}
              style={{ textDecoration: 'none' }}
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
