import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

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
    const result = loginWithRedirect()
    console.log(result)
  }

  function handleLogout(e) {
    e.preventDefault()
    const result = logout()
    console.log(result)
  }

  function consoleLog(e) {
    e.preventDefault()
    console.log('isAuthenticated', isAuthenticated)
    console.log('user', user)
  }

  return (
    <>
      <div className="app">
        {/* <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul> */}
        {/* receipts_keeper@hotmail.com
receiptsTest!23 */}
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
    </>
  )
}

export default App
