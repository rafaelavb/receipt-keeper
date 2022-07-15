import request from 'superagent'

const receiptsUrl = '/api/v1/receipts'

export function getReceipts(token) {
  return request
    .get(receiptsUrl)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

export function postReceipt(receipt, token) {
  return request
    .post(receiptsUrl)
    .set('authorization', `Bearer ${token}`)
    .send(receipt)
    .then((res) => res.body)
}

export function patchReceipt(receipt, token) {
  return request
    .patch(receiptsUrl)
    .set('authorization', `Bearer ${token}`)
    .send(receipt)
    .then((res) => res.body)
}

export function deleteReceipt(receipt, token) {
  return request
    .delete(receiptsUrl)
    .set('authorization', `Bearer ${token}`)
    .send(receipt)
    .then((res) => res.body)
}
