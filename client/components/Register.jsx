import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../apis'

export default function Register() {
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const [form, setForm] = useState({
    auth0Id: '',
    email: '',
    username: '',
  })

  useEffect(() => {
    setForm({
      auth0Id: loggedInUser?.auth0Id,
      email: loggedInUser?.email,
      username: username,
    })
  }, [loggedInUser, username])

  async function handleRegister() {
    await addUser(form)
    navigate(`/receipts/${username}`)
  }

  return (
    <Box sx={{ width: '100%', marginTop: '50px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ textAlign: 'center' }}
        mb="50px"
      >
        Register your Username
      </Typography>
      <Stack direction="column" alignItems="center" gap={5}>
        <FormControl disabled variant="standard" sx={{ width: '400px' }}>
          <InputLabel htmlFor="auth0Id">Auth0 Id: </InputLabel>
          <Input id="auth0Id" value={form.auth0Id} />
          <FormHelperText>Do not need to update this</FormHelperText>
        </FormControl>
        <FormControl disabled variant="standard" sx={{ width: '400px' }}>
          <InputLabel htmlFor="email">Email: </InputLabel>
          <Input id="email" value={form.email} />
          <FormHelperText>Do not need to update this</FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ width: '400px' }}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormHelperText>Enter your username</FormHelperText>
        </FormControl>
        <Button bgcolor="primary" onClick={handleRegister}>
          Register
        </Button>
      </Stack>
    </Box>
  )
}
