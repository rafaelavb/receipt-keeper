import categoriesReducer from '../categories'
import { categories } from '../../../tests/fake-data'

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
