import request from 'superagent'

const receiptsUrl = '/api/v1/receipts'

export function getReceipts(token) {
  return request
    .get(receiptsUrl)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}

export function postReceipt(receipt, token) {
  return request
    .post(receiptsUrl)
    .set('authorization', `Bearer ${token}`)
    .send(receipt)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}

export function patchReceipt(receipt, token) {
  return request
    .patch(receiptsUrl)
    .set('authorization', `Bearer ${token}`)
    .send(receipt)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}

export function deleteReceipt(receiptId, token) {
  return request
    .delete(`${receiptsUrl}/${receiptId}`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}
