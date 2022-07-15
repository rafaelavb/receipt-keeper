import { RECEIVE_STORES, REQUEST_STORES, STORES_ERROR } from '../actions'

const state = {
  data: [],
  // loading: false,
  error: null,
}

export default function storesReducer(state = [], action) {
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
