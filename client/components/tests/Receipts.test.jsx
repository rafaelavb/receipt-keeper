/**
 * @jest-environment jsdom
 */

import React from 'react'
import { screen, render, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Provider } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

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

  it("renders all stores' receipts the user has", () => {
    const storeParam = null
    useParams.mockReturnValue({ store: storeParam })

    render(
      <Provider store={fakeStore}>
        <Receipts />
      </Provider>
    )

    const cards = screen.getAllByRole('receiptCard')
    expect(cards).toHaveLength(fakeClientReceipts.length)
  })

  it("renders the selected store's receipts the user has", () => {
    const storeParam = 'Harvey Norman'
    useParams.mockReturnValue({ store: storeParam })

    const expectedCardLength = fakeClientReceipts.filter(
      (fakeReceipt) => fakeReceipt.store === storeParam
    ).length

    render(
      <Provider store={fakeStore}>
        <Receipts />
      </Provider>
    )

    const cards = screen.getAllByRole('receiptCard')

    expect.assertions(cards.length + 1)

    expect(cards).toHaveLength(expectedCardLength)

    cards.map((card) => {
      const receiptStore = within(card).getByRole('display-store')
      expect(receiptStore.textContent).toContain(storeParam)
    })
  })
})
