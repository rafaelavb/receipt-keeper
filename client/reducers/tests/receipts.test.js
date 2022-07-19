import receiptsReducer from '../receipts'
import {
  fetchReceipts,
  receiveReceipts,
  deleteReceipt,
  addReceipt,
  // setReceiptsError,
} from '../../actions/receipts'
import { objReceipts, fakeClientReceipts } from '../../../tests/fake-data'

describe('receipts reducer', () => {
  const emptyReceipt = {
    id: 0,
    auth0_id: '',
    name: '',
    image: '',
    purchase_date: '',
    store: '',
    price: 0,
    category_id: 0,
    note: '',
  }
  test.skip('it should get the details of a receipt', () => {
    const action = fetchReceipts(objReceipts) // async
    const newState = receiptsReducer(emptyReceipt, action)
    expect(newState.store).toBe('Smiths City')
  })
  test('receiveReceipts', () => {
    const action = receiveReceipts(objReceipts)
    const newState = receiptsReducer({ data: [], error: null }, action)

    expect(newState.data).toEqual(objReceipts)
    expect(newState.error).toBeNull()
  })
  test('deleteReceipt', () => {
    const initialState = {
      data: fakeClientReceipts, // [{} , {} , {}]
      error: null,
    }
    // delete receipt 1
    const action = deleteReceipt(1)
    const newState = receiptsReducer(initialState, action)
    // before
    // start with 4 objects
    expect(initialState.data).toHaveLength(4)
    // where the first one has an id of 1
    expect(initialState.data[0].id).toBe(1)
    // after
    // assert that I can't find receipt with id 1
    expect(newState.data.find((receipt) => receipt.id === 1)).toBeUndefined()
    // expect there only to be 3 receipts
    expect(newState.data).toHaveLength(3)
    // expect the first one to have an id of 2
    expect(newState.data[0].id).toBe(2)
  })

  test('addReceipt', () => {
    const initialState = {
      data: fakeClientReceipts, // [{} , {} , {}]
      error: null,
    }
    const action = addReceipt(5)
    const newState = receiptsReducer(initialState, action)
    expect(initialState.data).toHaveLength(4)
    expect(newState.data).toHaveLength(5)
    expect(newState.data[4]).toBe(5)
  })

  //   test('setReceiptsError', () => {
  //     const initialState = {
  //       data: fakeClientReceipts, // [{} , {} , {}]
  //       error: null,
  //     }
  //     const action = setReceiptsError('error')
  //     const newState = receiptsReducer(initialState, action)
  //     expect(initialState.data).toHaveLength(4)

  //     expect(newState.data).toHaveLength(5)
  //     expect(newState.data[4]).toBe(5)
  //   })
})
