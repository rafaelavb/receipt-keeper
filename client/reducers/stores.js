import { RECEIVE_STORES, REQUEST_STORES, STORES_ERROR } from '../actions'

const initialState = {
  data: [],
  // loading: false,
  error: null,
}

export default function storesReducer(state = initialState, action) {
  const { type, payload, errorMessage } = action
  switch (type) {
    case REQUEST_STORES:
      return {
        ...state,
        // loading: true,
      }
    case RECEIVE_STORES:
      return {
        ...state,
        data: payload,
        // loading: false,
      }
    case STORES_ERROR:
      return {
        ...state,
        // loading: false,
        errorMessage: errorMessage,
      }
    default:
      return state
  }
}
