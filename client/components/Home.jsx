import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { IfNotAuthenticated } from './Authenticated'

export default function Home() {
  const { loginWithRedirect } = useAuth0()

  function handleRegister(e) {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    }).then((res) => console.log(res))
  }

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
