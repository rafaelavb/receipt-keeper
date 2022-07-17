import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  CATEGORIES_ERROR,
} from '../actions'

const initialState = {
  data: [],
  // loading: false,
  error: null,
}

export default function categoriesReducer(state = initialState, action) {
  const { type, payload, error } = action

  switch (type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        // loading: true,
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        data: payload,
        // loading: false,
      }
    case CATEGORIES_ERROR:
      return {
        ...state,
        // loading: false,
        error: error,
      }
    default:
      return state
  }
}