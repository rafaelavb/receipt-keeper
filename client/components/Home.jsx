import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Home() {
  const { logout, loginWithRedirect } = useAuth0()

  function handleRegister(e) {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    }).then((res) => console.log(res))
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

  return (
    <div>
      <div className="app">
        <h1>Hello World</h1>
        <IfAuthenticated>
          <button onClick={handleLogout}>Log out</button>
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

    </div>
  )
}
