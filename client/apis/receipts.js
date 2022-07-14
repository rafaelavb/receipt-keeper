import request from 'superagent'

const receiptsURL = '/api/v1/receipts'

export function getReceipts(token) {
  return request
    .get(receiptsURL)
    .set('authorization', `Bearer${token}`)
    .then((res) => {
      return res.body
    })
    .catch(logError)
}

export function postReceipt(receipt, token) {
  return request
    .post(receiptsURL)
    .set('authorization', `Bearer ${token}`)
    .send(receipt)
    .then((res) => {
      return res.body
    })
    .catch(logError)
}

export function getStores(token) {
  return request
    .get(`${receiptsURL}/all/stores`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}
