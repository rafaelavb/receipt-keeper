import * as api from '../apis'

export const REQUEST_RECEIPTS = 'REQUEST_RECEIPTS'
export function requestReceipts() {
  return {
    type: REQUEST_RECEIPTS,
  }
}

export const RECEIVE_RECEIPTS = 'RECEIVE_RECEIPTS'
export function receiveReceipts(receipts) {
  return {
    type: RECEIVE_RECEIPTS,
    payload: receipts,
  }
}

export function fetchReceipts(token) {
  return (dispatch) => {
    dispatch(requestReceipts())
    return api
      .getReceipts(token)
      .then((receipts) => {
        dispatch(receiveReceipts(receipts))
      })
      .catch((error) => dispatch(setReceiptsError(error.message)))
  }
}

export const ADD_RECEIPT = 'ADD_RECEIPT'
export function addReceipt(receipt) {
  return {
    type: ADD_RECEIPT,
    payload: receipt,
  }
}

export function createReceipt(receipt, token) {
  return (dispatch) => {
    return api
      .postReceipt(receipt, token)
      .then((createdReceipt) => dispatch(addReceipt(createdReceipt)))
      .catch((error) => dispatch(setReceiptsError(error.message)))
  }
}

export const UPDATE_RECEIPT = 'UPDATE_RECEIPT'
export function updateReceiptAction(receipt) {
  return {
    type: UPDATE_RECEIPT,
    payload: receipt,
  }
}

export function updateReceipt(receipt, token) {
  return (dispatch) => {
    return api
      .patchReceipt(receipt, token)
      .then((updatedReceipt) => dispatch(updateReceiptAction(updatedReceipt)))
      .catch((error) => dispatch(setReceiptsError(error.message)))
  }
}

export const DELETE_RECEIPT = 'DELETE_RECEIPT'
export function deleteReceipt(receipt) {
  return {
    type: DELETE_RECEIPT,
    payload: receipt,
  }
}

export function removeReceipt(receiptToDelete, token) {
  return (dispatch) => {
    return api
      .deleteReceipt(receiptToDelete, token)
      .then((receiptToDelete) => dispatch(deleteReceipt(receiptToDelete)))
      .catch((error) => dispatch(setReceiptsError(error.message)))
  }
}

export const RECEIPTS_ERROR = 'RECEIPTS_ERROR'
export function setReceiptsError(error) {
  return {
    type: RECEIPTS_ERROR,
    errorMessage: error,
  }
}
