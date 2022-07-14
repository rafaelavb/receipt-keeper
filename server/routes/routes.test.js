const request = require('supertest')

const server = require('../server')

import { getReceipts } from '../db/receipts'

jest.mock('../db/receipts')

beforeAll(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})
afterAll(() => {
  console.error.mockRestore()
  jest.restoreAllMocks()
})

describe('GET /api/v1/receipts', () => {
  it('returns a list of all the receipts', () => {
    getReceipts.mockImplementation(() =>
      Promise.resolve([
        {
          auth0_id: 2,
          name: 'randomName',
          image: 'randomsImage',
          purchase_date: '27-01-23',
          store: 'Warehouse',
          price: '44.60',
          note: 'Clothes',
        },
      ])
    )
    return request(server)
      .get('/api/v1/receipts')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(1)
        expect(res.body[0].auth0_id).toBe(2)
        expect(res.body[0].name).toBe('randomName')
        expect(res.body[0].image).toBe('randomsImage')
        expect(res.body[0].purchase_date).toBe('27-01-23')
        expect(res.body[0].store).toBe('Warehouse')
        expect(res.body[0].price).toBe('44.60')
        expect(res.body[0].note).toBe('Clothes')
      })
  })
  it('responds with 500 and error if not correct', () => {
    getReceipts.mockImplementation(() =>
      Promise.reject(new Error('Server Error'))
    )
    return request(server)
      .get('/api/v1/receipts')
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('Server Error')
      })
  })
})
