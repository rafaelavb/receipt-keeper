import receiptsReducer from '../receipts'
import {
  fakeClientReceipts,
  reducerErrorMessage,
  fakePatchedReceipt,
} from '../../../tests/fake-data'

test('case REQUEST_RECEIPTS should request receipts', () => {
  const initialState = {
    data: [],
    error: null,
  }
  const action = {
    type: 'REQUEST_RECEIPTS',
  }

  const newState = receiptsReducer(initialState, action)
  expect(newState).toEqual(initialState)
  expect(newState.error).toBeNull()
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

test('case DELETE_RECEIPT should remove a receipt from state.data', () => {
  const initialState = {
    data: fakeClientReceipts,
    error: null,
  }

  const action = { type: 'DELETE_RECEIPT', payload: 1 }

  const newState = receiptsReducer(initialState, action)
  expect(initialState.data).toHaveLength(4)
  expect(initialState.data[0].id).toBe(1)
  expect(newState.data.find((receipt) => receipt.id === 1)).toBeUndefined()
  expect(newState.data).toHaveLength(3)
  expect(newState.data[0].id).toBe(2)
})

test('case RECEIPTS_ERROR should return error message as state.error', () => {
  const initialState = {
    data: [],
    error: null,
  }

  const action = {
    type: 'RECEIPTS_ERROR',
    error: reducerErrorMessage,
  }

  const newState = receiptsReducer(initialState, action)
  expect(initialState.data).toEqual([])
  expect(newState.error).toEqual(reducerErrorMessage)
})
