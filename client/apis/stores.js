import request from 'superagent'

const receiptsUrl = '/api/v1/receipts'

export function getStores(token) {
  return request
    .get(`${receiptsUrl}/all/stores`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
}
