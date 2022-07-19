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
      }
    case RECEIVE_RECEIPTS:
      return {
        ...state,
        data: payload,
      }
    case ADD_RECEIPT:
      return {
        ...state,
        data: [...state.data, payload],
      }
    case UPDATE_RECEIPT:
      return {
        ...state,
        data: state.data.map((receipt) =>
          receipt.id === payload.id ? payload : receipt
        ),
      }
    case DELETE_RECEIPT:
      return {
        ...state,
        data: state.data.filter((receipt) => receipt.id !== payload),
      }
    case RECEIPTS_ERROR:
      return {
        ...state,
        error: error,
      }
    default:
      return state
  }
}
