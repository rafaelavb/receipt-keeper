import {
  ADD_RECEIPT,
  DELETE_RECEIPT,
  RECEIPTS_ERROR,
  RECEIVE_RECEIPTS,
  REQUEST_RECEIPTS,
  UPDATE_RECEIPT,
} from '../actions/receipts'

const initialState = {
  data: [],
  // loading: false,
  errorMessage: null,
}

export default function receiptsReducer(state = initialState, action) {
  const { type, payload, errorMessage } = action
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
      return {
        ...state,
        data: [...state.data, payload],
        // loading: false,
      }
    case UPDATE_RECEIPT:
      return {
        ...state,
        data: [
          state.data.map((receipt) =>
            receipt.id === payload.id ? (receipt = payload) : receipt
          ),
        ],
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
        errorMessage: errorMessage,
      }
    default:
      return state
  }
}
