/**
 * @jest-environment jsdom
 */
import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { useAuth0 } from '@auth0/auth0-react'

import Navbar from '../Navbar'

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: jest.fn(),
}))

const spyLogout = jest.fn()

const spyLogin = jest.fn()

describe('<Navbar home="home"/>', () => {
  it('has working Log In button when not-logged-in user click the Menu Icon', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: spyLogin,
    })

    render(<Navbar home="home" />)

    const menuIcon = screen.getByTestId('MenuIcon')
    await userEvent.click(menuIcon)
    const menuItems = screen.getAllByRole('menuitem')

    expect.assertions(3)
    expect(menuItems).toHaveLength(1)
    expect(menuItems[0].textContent).toMatch(/log in/gi)
    await userEvent.click(menuItems[0])
    expect(spyLogin).toHaveBeenCalled()
  })
})

describe('<Navbar />', () => {
  it('has working Log Out button when logged-in user click the Menu Icon', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: spyLogout,
      loginWithRedirect: spyLogin,
    })
    render(<Navbar />)
    expect.assertions(3)
    const menuIcon = screen.getByTestId('MenuIcon')

    await userEvent.click(menuIcon)
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(1)
    expect(menuItems[0].textContent).toMatch(/log out/gi)

    await userEvent.click(menuItems[0])
    expect(spyLogout).toHaveBeenCalled()
  })
}, 15000)
