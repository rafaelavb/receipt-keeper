import {
  REQUEST_RECEIPTS,
  RECEIVE_RECEIPTS,
  ADD_RECEIPT,
  UPDATE_RECEIPT,
  DELETE_RECEIPT,
  RECEIPTS_ERROR,
} from '../actions'

const initialState = {
  data: [],
  // loading: false,
  error: null,
}

export default function receiptsReducer(state = initialState, action) {
  const { type, payload, error } = action

  switch (type) {
    case REQUEST_RECEIPTS:
      return {
        ...state,
        // loading: true,
      }
    case RECEIVE_RECEIPTS:
      return {
        ...state,
        data: payload,
        // loading: false,
      }
    case ADD_RECEIPT:
      console.log('reducer')
      return {
        ...state,
        data: [...state.data, payload],
        // loading: false,
      }
    case UPDATE_RECEIPT:
      console.log('state.data', state.data)
      console.log('payload', payload)
      return {
        ...state,
        data: state.data.map((receipt) => {
          return receipt.id === payload.id ? payload : receipt
        }),
        // loading: false,
      }
    case DELETE_RECEIPT:
      return {
        ...state,
        data: [state.data.filter((receipt) => receipt !== payload)],
        // loading: false,
      }
    case RECEIPTS_ERROR:
      return {
        ...state,
        // loading: false,
        error: error,
      }
    default:
      return state
  }
}
