import React from 'react'
import '@testing-library/react'
import { screen, render } from '@testing-library/react'

import { Provider } from 'react-redux'

import Receipts from '../Receipts'
import { fakeClientReceipts } from '../../../tests/fake-data'

jest.mock('react-redux')

beforeAll(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  jest.restoreAllMocks()
})

describe('<Receipts /> renders users receipts', () => {
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
  }

  fakeStore.getState.mockReturnValue({
    receipts: {
      data: fakeClientReceipts,
      error: null,
    },
  })

  it('renders all receipts the user has in the receiptsReducer', () => {
    render(
      <Provider store={fakeStore}>
        <Receipts />
      </Provider>
    )
    const petNames = screen.getAllByRole('heading')
    console.log(petNames)
  })
})
