import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { getUsername } from '../apis'

import { IfNotAuthenticated } from './Authenticated'

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
    <div>
      <div className="app">
        <h1>Hello World</h1>
        <IfNotAuthenticated>
          <button>
            <a href="/" onClick={handleRegister}>
              Register
            </a>
          </button>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}
