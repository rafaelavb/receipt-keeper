import { getStores } from '../apis'

export const REQUEST_STORES = 'REQUEST_STORES'
export function getAllStores() {
  return {
    type: REQUEST_STORES,
  }
}

export const RECEIVE_STORES = 'RECEIVE_STORES'
export function receiveStores(stores) {
  return {
    type: RECEIVE_STORES,
    payload: stores,
  }
}

export function fetchStores(token) {
  return (dispatch) => {
    return getStores(token)
      .then((stores) => dispatch(getAllStores(stores)))
      .catch((error) => dispatch(setStoresError(error.message)))
  }
}

export const STORES_ERROR = 'STORES_ERROR'
export function setStoresError(error) {
  return {
    type: STORES_ERROR,
    errorMessage: error,
  }
}
