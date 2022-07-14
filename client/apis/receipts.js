import request from 'superagent'

const receiptsUrl = '/api/v1/receipts'

export function getReceipts() {
  return request.get(receiptsUrl).then((res) => res.body)
}

export function addReceipt(receipt, token) {
  return request
    .post(receiptsUrl)
    .set('authorization', `Bearer ${token}`) // is this required?
    .send(receipt)
    .then((res) => res.body)
}

export function updateReceipt(receipt, token) {
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
