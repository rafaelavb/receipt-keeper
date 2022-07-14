import { GET_ALL_RECEIPTS } from '../actions/receipts'

const initialState = []

const receiptsReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_RECEIPTS:
      return payload
    default:
      return state
  }
}

export default receiptsReducer
