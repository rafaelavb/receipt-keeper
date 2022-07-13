import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './Home'
import Register from './Register'
import Navbar from './Navbar'
import Main from './Main'

function App() {
  // const dispatch = useDispatch()
  useEffect(() => {}, [])

  const { logout, loginWithRedirect } = useAuth0()

  function handleRegister(e) {
    e.preventDefault()
    return loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  const { isAuthenticated, user } = useAuth0()

  // function handleRegister(e) {
  //   e.preventDefault()
  //   loginWithRedirect({
  //     redirectUri: `${window.location.origin}/register`,
  //   }).then((result) => {
  //     console.log(result)
  //   })
  // }

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
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:username" element={<Main />} />
      </Routes>

      <div className="app">
        <h1>Hello World</h1>
        <IfAuthenticated>
          <button onClick={handleLogout}>Log out</button>
          <button onClick={consoleLog}>Console Log</button>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Log in</button>
        </IfNotAuthenticated>
      </div>

      <Link to="/register">
        <button>register page</button>
      </Link>
      <Link to="/lauren">
        <button>user page</button>
      </Link>
    </>
  )
}

export default App
