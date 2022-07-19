import categoriesReducer from '../categories'
import { reducerErrorMessage, categories } from '../../../tests/fake-data'

test('case REQUEST_CATEGORIES should request categories', () => {
  const initialState = {
    data: [],
    error: null,
  }
  const action = {
    type: 'REQUEST_CATEGORIES',
  }

  const newState = categoriesReducer(initialState, action)

  expect(newState).toEqual(initialState)
  expect(newState.error).toBeNull()
})

test('case RECEIVE_CATEGORIES should receive categories', () => {
  const initialState = {
    data: [],
    error: null,
  }

  const action = {
    type: 'RECEIVE_CATEGORIES',
    payload: categories,
  }

  const newState = categoriesReducer(initialState, action)

  expect(newState.data).toEqual(categories)
  expect(newState.error).toBeNull()
})

test('case CATEGORIES_ERROR should return an error', () => {
  const initialState = {
    data: [],
    error: null,
  }

  const action = {
    type: 'CATEGORIES_ERROR',
    error: reducerErrorMessage,
  }
  const newState = categoriesReducer(initialState, action)
  expect(initialState.data).toEqual([])
  expect(newState.error).toEqual(reducerErrorMessage)
})
