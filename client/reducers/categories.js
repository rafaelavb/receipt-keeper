import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  CATEGORIES_ERROR,
} from '../actions'

const initialState = {
  data: [],
  error: null,
}

export default function categoriesReducer(state = initialState, action) {
  const { type, payload, error } = action

  switch (type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        data: payload,
      }
    case CATEGORIES_ERROR:
      return {
        ...state,
        error: error,
      }
    default:
      return state
  }
}
