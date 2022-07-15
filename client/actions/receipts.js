import { getReceipts } from '../apis'

export const GET_ALL_RECEIPTS = 'GET_ALL_RECEIPTS'

export function getAllReceipts(receipts) {
  return {
    type: GET_ALL_RECEIPTS,
    payload: receipts,
  }
}

export function fetchReceipts(token) {
  return (dispatch) => {
    return getReceipts(token).then((receipts) => {
      dispatch(getAllReceipts(receipts))
      return null
    })
  }
}
