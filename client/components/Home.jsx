import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { getUsername } from '../apis'

import { IfNotAuthenticated } from './Authenticated'

import { Stack, Typography } from '@mui/material'

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
    console.log(loggedInUser)
    if (loggedInUser.token) {
      getUsername(loggedInUser.token).then((username) => {
        console.log(username)
        if (username) {
          navigate(`/receipts/${username}`)
        }
      })
    }
  }, [loggedInUser])

  return (
    <div className="app">
      <IfNotAuthenticated>
        {/* <Stack direction="row" justifyContent="center"> */}
        <Typography variant="h1" color="primary" align="center">
          We keep your receipts for you
        </Typography>
        {/* </Stack> */}

        <button>
          <a href="/" onClick={handleRegister}>
            Register
          </a>
        </button>
      </IfNotAuthenticated>
    </div>
  )
}

/* <body>
<div id="app"></div>
<script src="/bundle.js"></script>
<div><p>hello there how is it going</p></div>
</body> */
