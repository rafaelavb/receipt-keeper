import { GET_STORES } from '../actions'

export default function storesReducer(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case GET_STORES:
      return payload
    default:
      return state
  }
}
