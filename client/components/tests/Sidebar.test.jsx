import React from 'react'
import '@testing-library/react'
import '@testing-library/jest-dom'

import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom'

import { fakeClientReceipts, FakeLinkedPage } from '../../../tests/fake-data'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(storeButtons.length).toStrictEqual(uniqueStores.length + 1)
    // await userEvent.click(storeButtons[testingStoreIndex + 1])
    // const linkedPage = screen.getAllByRole()
    // expect(linkedPage.textContent).toContain(
    //   fakeReceiptsStores[testingStoreIndex]
    // )
  })
})
