const request = require('supertest')
const server = require('../../server')
const db = require('../../db/receipts')

import { objReceipts } from '../../../tests/fake-data'
const checkJwt = require('../../auth0')

jest.mock('../db/receipts')
jest.mock('../auth0')

beforeAll(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: objReceipts.auth0_id }
    next()
  })
})
afterAll(() => {
  console.error.mockRestore()
  jest.restoreAllMocks()
})

describe('GET /api/v1/receipts', () => {
  it('returns all receipts from the db', () => {
    expect.assertions(2)
    db.getReceipts.mockReturnValue(Promise.resolve(objReceipts))
    return request(server)
      .get('/api/v1/receipts')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body[0].store).toBe('Smiths City')
      })
  })
  it("should return status 500 and error when database doesn't work", () => {
    expect.assertions(2)
    db.getReceipts.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/receipts')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Server Error')
      })
  })
})

//  TO DO
// describe('POST /api/v1/receipts', () => {})

// describe('PATCH api/v1/receipts', () => {})

// describe('DELETE api/v1/receipts', () => {})
