import receiptsReducer from '../receipts'
import {
  fetchReceipts,
  receiveReceipts,
  deleteReceipt,
  addReceipt,
  updateReceipt,
  setReceiptsError,
  updateReceiptAction,
} from '../../actions/receipts'
import {
  objReceipts,
  fakeClientReceipts,
  reducerErrorMessage,
  fakePatchedReceipt,
} from '../../../tests/fake-data'

// const mockDispatch = jest.fn()
// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: () => mockDispatch,
// }))

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

  test('case RECEIVE_RECEIPTS should set state.data to be the receipts', () => {
    const initialState = {
      data: [],
      error: null,
    }

    const action = {
      type: 'RECEIVE_RECEIPTS',
      payload: fakeClientReceipts,
    }

    const newState = receiptsReducer(initialState, action)

    expect(newState.data).toEqual(fakeClientReceipts)
    expect(newState.error).toBeNull()
  })

  test('case ADD_RECEIPT should add a receipt to state.data', () => {
    const initialState = {
      data: fakeClientReceipts,
      error: null,
    }
    const action = {
      type: 'ADD_RECEIPT',
      payload: fakeClientReceipts,
    }

    const newState = receiptsReducer(initialState, action)
    expect(initialState.data).toHaveLength(4)
    expect(newState.data).toHaveLength(5)
  })

  test('case DELETE_RECEIPT should remove a receipt from state.data', () => {
    const initialState = {
      data: fakeClientReceipts,
      error: null,
    }
    // const action = deleteReceipt(1)
    const action = { type: 'DELETE_RECEIPT', payload: 1 }

    const newState = receiptsReducer(initialState, action)
    expect(initialState.data).toHaveLength(4)
    expect(initialState.data[0].id).toBe(1)
    expect(newState.data.find((receipt) => receipt.id === 1)).toBeUndefined()
    expect(newState.data).toHaveLength(3)
    expect(newState.data[0].id).toBe(2)
  })

  test('case UPDATE_RECEIPT should update the receipt based on id', () => {
    const initialState = {
      data: fakeClientReceipts,
      error: null,
    }

    const updateAction = {
      type: 'UPDATE_RECEIPT',
      payload: fakePatchedReceipt,
    }
    const newState = receiptsReducer(initialState, updateAction)

    expect(newState.data[3]).toEqual(fakePatchedReceipt)
  })

  test('case RECEIPTS_ERROR should return error message as state.error', () => {
    const initialState = {
      data: [],
      error: null,
    }

    const action = setReceiptsError(reducerErrorMessage)
    const newState = receiptsReducer(initialState, action)

    expect(initialState.data).toEqual([])
    expect(newState.error).toEqual(reducerErrorMessage)
  })
})
