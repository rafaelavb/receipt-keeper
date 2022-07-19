import React from 'react'
import '@testing-library/react'
import '@testing-library/jest-dom'

import { screen, render } from '@testing-library/react'

import { Provider } from 'react-redux'

import Receipts from '../Receipts'

import { fakeClientReceipts } from '../../../tests/fake-data'

beforeAll(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  jest.restoreAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('<Receipts /> renders users receipts', () => {
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
      receipts: {
        data: fakeClientReceipts,
        error: null,
      },
      loggedInUser: {
        token: '123abc',
      },
    })),
  }

  it('renders all receipts the user has for all stores )', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        store: null,
      }),
    }))
    render(
      <Provider store={fakeStore}>
        <Receipts />
      </Provider>
    )
    screen.debug()
  })

  it.only('renders all receipts the user has ONLY for selected store)', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        store: 'Harvey Norman',
      }),
    }))
    render(
      <Provider store={fakeStore}>
        <Receipts />
      </Provider>
    )
    screen.getByRole()
  })
})
