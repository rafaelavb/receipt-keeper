/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom'

import { fakeClientReceipts, FakeLinkedPage } from '../../../tests/fake-data'
import Sidebar from '../Sidebar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

describe('<Sidebar />', () => {
  const fakeReceiptsStores = fakeClientReceipts.map(
    (fakeReceipt) => fakeReceipt.store
  )
  const uniqueStores = [...new Set(fakeReceiptsStores)]
  const testingStoreIndex = 0

  useParams.mockReturnValue({
    username: 'Lauren',
    store: fakeReceiptsStores[testingStoreIndex],
  })
  it("should display all stores of the user's receipts", async () => {
    render(
      <MemoryRouter initialEntries={['/receipts/:username']}>
        <Routes>
          <Route
            path="/receipts/:username"
            element={<Sidebar stores={fakeReceiptsStores} />}
          />
          <Route
            path="/receipts/:username/:store"
            element={<FakeLinkedPage />}
          />
        </Routes>
      </MemoryRouter>
    )
    const storeButtons = screen.getAllByRole('button')
    expect.assertions(2)
    expect(storeButtons[0].textContent).toMatch(/all stores/gi)
    expect(storeButtons).toHaveLength(uniqueStores.length + 1)
  })

  it("should link to '/receipts/:username/:store' Route when user clicks the store button", async () => {
    render(
      <MemoryRouter initialEntries={['/receipts/:username']}>
        <Routes>
          <Route
            path="/receipts/:username"
            element={<Sidebar stores={fakeReceiptsStores} />}
          />
          <Route
            path="/receipts/:username/:store"
            element={<FakeLinkedPage />}
          />
        </Routes>
      </MemoryRouter>
    )
    const storeButtons = screen.getAllByRole('button')
    const buttonToBeClicked = storeButtons[testingStoreIndex + 1]
    await userEvent.click(buttonToBeClicked)
    expect(document.body.innerHTML).toContain(
      fakeReceiptsStores[testingStoreIndex]
    )
  })
}, 15000)
