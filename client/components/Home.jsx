import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useNavigate } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Home() {
  const navigate = useNavigate()
  const { logout, loginWithRedirect } = useAuth0()

  function handleRegister(e) {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    }).then((result) => result)
  }

  const { isAuthenticated, user } = useAuth0()

  function handleLogin(e) {
    e.preventDefault()
    return loginWithRedirect()
  }

  function handleLogout(e) {
    e.preventDefault()
    return logout()
  }

  function consoleLog(e) {
    e.preventDefault()
    console.log('isAuthenticated', isAuthenticated)
    console.log('user', user)
  }
  return (
    <div>
      <div className="app">
        <h1>Hello World</h1>
        <IfAuthenticated>
          <button onClick={handleLogout}>Log out</button>
          <button onClick={consoleLog}>Console Log</button>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button>
            <a href="/" onClick={handleRegister}>
              Register
            </a>
          </button>
          <button onClick={handleLogin}>Log in</button>
        </IfNotAuthenticated>
      </div>

      <Link to="register">
        <button>register page</button>
      </Link>
      <Link to="receipts/lauren">
        <button>user page</button>
      </Link>
    </div>
  )
}
