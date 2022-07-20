/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/react'
import '@testing-library/jest-dom'

import Receipt from '../Receipt'
import { fakeReceipt, fakeClientReceipts } from '../../../tests/fake-data'
import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'

describe('<Receipt />', () => {
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
      loggedInUser: {
        token: '123abc',
      },
    })),
  }

  it('render all info of the receipt passed by props, when the receipt has all info', () => {
    render(
      <Provider store={fakeStore}>
        <Receipt receipt={fakeReceipt} />
      </Provider>
    )
    const parsedFakeReceiptImage = JSON.parse(fakeReceipt.image)

    expect.assertions(11)

    const receiptName = screen.getByRole('display-receipt-name')
    expect(receiptName.textContent).toContain(fakeReceipt.name)
    expect(receiptName.textContent).not.toBeFalsy()

    const receiptPrice = screen.getByRole('display-price')
    expect(receiptPrice.textContent).toContain(fakeReceipt.price.toString())
    expect(receiptPrice.textContent).not.toBe('$ ')

    const receiptImage = screen.getByRole('img', {
      name: parsedFakeReceiptImage.name,
    })
    expect(receiptImage).toBeInTheDocument()

    const receiptStore = screen.getByRole('display-store')
    expect(receiptStore.textContent).toContain(fakeReceipt.store)
    expect(receiptStore.textContent).not.toBeFalsy()

    const receiptNote = screen.getByRole('display-note')
    expect(receiptNote.textContent).toContain(fakeReceipt.note)
    expect(receiptNote.textContent).not.toBeFalsy()

    const receiptWarranty = screen.getByRole('display-warranty')
    expect(receiptWarranty.textContent).toContain(
      new Date(fakeReceipt.expiryDate).toLocaleDateString('en-NZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    )
    new Date().getTime() > new Date(fakeReceipt.expiryDate).getTime()
      ? expect(receiptWarranty.textContent).toContain('expired')
      : expect(receiptWarranty.textContent).not.toContain('expired')
  })

  it.todo(
    'render all info of the receipt passed by props'
    // , () => {
    //   render(
    //     <Provider store={fakeStore}>
    //       <Receipt receipt={fakeReceipt} />
    //     </Provider>
    //   )
    //   const parsedFakeReceiptImage = JSON.parse(fakeReceipt.image)
    //   expect.assertions(4)
    //   const receiptName = screen.getByRole('display-receipt-name')
    //   expect(receiptName.textContent).toContain(fakeReceipt.name)
    //   const receiptPrice = screen.getByRole('display-price')
    //   expect(receiptPrice.textContent).toContain(fakeReceipt.price.toString())
    //   const receiptImage = screen.getByRole('img', {
    //     name: parsedFakeReceiptImage.name,
    //   })
    //   expect(receiptImage).toBeInTheDocument()
    //   const receiptStore = screen.getByRole('display-store')
    //   expect(receiptStore.textContent).toContain(fakeReceipt.store)
    // })
    // }
  )
})
