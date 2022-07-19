const request = require('supertest')
const server = require('../../server')
const db = require('../../db/')

const checkJwt = require('../../auth0')
import {
  fakeClientReceipts,
  fakePostReceiptWithWarranty,
  fakeCreatedReceiptWithWarranty,
} from '../../../tests/fake-data'

jest.mock('../../db/')
jest.mock('../../auth0')

beforeAll(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: fakeClientReceipts.auth0Id }
    next()
  })
})

afterAll(() => {
  console.error.mockRestore()
  jest.restoreAllMocks()
})

const receiptsUrl = '/api/v1/receipts'

describe('GET /api/v1/receipts', () => {
  it.skip('returns all receipts from the db', () => {
    const expected = fakeClientReceipts.map((receipt) => ({
      ...receipt,
      image: JSON.parse(receipt.image),
    }))
    db.getReceipts.mockReturnValue(Promise.resolve(fakeClientReceipts))

    expect.assertions(2)

    return request(server)
      .get(receiptsUrl)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expected)
      })
  })

  it.skip("should return status 500 and error when database doesn't work", () => {
    db.getReceipts.mockImplementation(() => Promise.reject(new Error()))

    expect.assertions(2)

    return request(server)
      .get(receiptsUrl)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('Server Error')
      })
  })
})

describe('POST /api/v1/receipts', () => {
  it.skip('should add a new receipt with warranty', () => {
    const parsedClientReceipts = fakeClientReceipts.map((receipt) => ({
      ...receipt,
      image: JSON.parse(receipt.image),
    }))

    const parsedCreatedReceipt = {
      ...fakeCreatedReceiptWithWarranty,
      image: JSON.parse(fakeCreatedReceiptWithWarranty.image),
    }
    console.log(fakeCreatedReceiptWithWarranty)

    const expected = { ...parsedClientReceipts, parsedCreatedReceipt }

    expect.assertions(1)

    return request(server)
      .post(receiptsUrl)
      .send(fakePostReceiptWithWarranty)
      .then((res) => {
        // console.log(res.body)
        // expect(res.status).toBe(201)
        expect(res.body).toEqual(expected)
      })
  })
})

// *** TO DO ***
// describe('PATCH api/v1/receipts', () => {})

// describe('DELETE api/v1/receipts', () => {})
