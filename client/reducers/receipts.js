import { SET_FRUITS } from '../actions/receipts'

const initialState = []

const receiptsReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_FRUITS:
      return payload
    default:
      return state
  }
}

export default receiptsReducer
