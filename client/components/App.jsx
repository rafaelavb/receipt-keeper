import React from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Home from './Home'
import Register from './Register'
import Navbar from './Navbar'
import Main from './Main'
import { cacheUser } from '../auth0-utils'

function App() {
  cacheUser(useAuth0)
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="/receipts/:username" element={<Main />} />
          <Route path="/receipts/:username/:store" element={<Main />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
