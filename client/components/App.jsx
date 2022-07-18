import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { cacheUser } from '../auth0-utils'

import Home from './Home'
import Register from './Register'
import Navbar from './Navbar'
import Main from './Main'

function App() {
  cacheUser(useAuth0)

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar home="home" />
                <Home />
              </>
            }
          />

          <Route
            path="register"
            element={
              <>
                <Navbar />
                <Register />
              </>
            }
          />
          <Route
            path="/receipts/:username"
            element={
              <>
                <Navbar />
                <Main />
              </>
            }
          />
          <Route
            path="/receipts/:username/:store"
            element={
              <>
                <Navbar />
                <Main />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
