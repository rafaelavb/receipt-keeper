import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getUsername } from '../apis'
import { IfNotAuthenticated } from './Authenticated'

export default function Home() {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const loggedInUser = useSelector((state) => state.loggedInUser)

  async function handleRegister(e) {
    e.preventDefault()
    await loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  useEffect(() => {
    if (loggedInUser) {
      getAccessTokenSilently().then((token) => {
        console.log(token)
        getUsername(token).then((username) => {
          console.log(username)
          navigate(`/receipts/${username}`)
        })
      })
      // getUsername(loggedInUser).then((username) => {
      //   if (username) {
      //     console.log(username)
      //     navigate(`/receipts/${username}`)
      //   }
      // })
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
