import * as api from '../apis'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    payload: categories,
  }
}

export function fetchCategories(token) {
  return (dispatch) => {
    dispatch(requestCategories())
    return api
      .getCategories(token)
      .then((categories) => {
        console.log('action')
        dispatch(receiveCategories(categories))
      })
      .catch((error) => dispatch(setCategoriesError(error.message)))
  }
}

export const CATEGORIES_ERROR = 'CATEGORIES_ERROR'
export function setCategoriesError(errorMessage) {
  return {
    type: CATEGORIES_ERROR,
    error: errorMessage,
  }
}
