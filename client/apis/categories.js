import request from 'superagent'

const categoriesUrl = '/api/v1/categories'

export function getCategories(token) {
  return request
    .get(categoriesUrl)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
}
