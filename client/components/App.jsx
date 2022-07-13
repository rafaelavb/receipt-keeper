import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import Register from './Register'
import Navbar from './Navbar'
import Main from './Main'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:username" element={<Main />} />
      </Routes>
    </>
  )
}

export default App
