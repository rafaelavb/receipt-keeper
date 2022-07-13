import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { addUser } from '../apis'

export default function Register() {
  const user = useSelector((state) => state.loggedInUser)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const [form, setForm] = useState({
    auth0Id: '',
    email: '',
    username: '',
  })

  useEffect(() => {
    setForm({
      auth0Id: '',
      email: '',
      username: username,
    })
  }, [user, username])

  async function handleRegister(e) {
    await addUser(form)
    navigate('/')
  }

  return (
    <Box>
      Register Componenet
      <FormControl disabled variant="standard">
        <InputLabel htmlFor="auth0Id">Auth0 Id: </InputLabel>
        <Input id="auth0Id" value={form.auth0Id} />
        <FormHelperText>Do not need to update this</FormHelperText>
      </FormControl>
      <FormControl disabled variant="standard">
        <InputLabel htmlFor="email">Email: </InputLabel>
        <Input id="email" value={form.email} />
        <FormHelperText>Do not need to update this</FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormHelperText>Enter your username</FormHelperText>
      </FormControl>
      <Button onClick={handleRegister}>Register</Button>
    </Box>
  )
}
