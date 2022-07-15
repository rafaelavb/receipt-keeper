import { getStores } from '../apis'

export const GET_STORES = 'GET_STORES'

export function getAllStores(stores) {
  return {
    type: GET_STORES,
    payload: stores,
  }
}

export function fetchStores(token) {
  return (dispatch) => {
    return getStores(token).then((stores) => {
      dispatch(getAllStores(stores))
      return null
    })
  }
}
