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
  // jest.clearAllMocks()
  // jest.spyOn(console, 'error')
  // console.error.mockImplementation(() => {})
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: fakeClientReceipts.auth0Id }
    next()
  })
})

// afterEach(() => {
// console.error.mockRestore()
//   jest.restoreAllMocks()
// })

const receiptsUrl = '/api/v1/receipts'

describe('GET /api/v1/receipts', () => {
  it('returns all receipts from the db', () => {
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

  it("returns status 500 and error when database doesn't work", () => {
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
  it('adds a new receipt with warranty', async () => {
    const expected = {
      ...fakeCreatedReceiptWithWarranty,
      image: JSON.parse(fakeCreatedReceiptWithWarranty.image),
    }
    db.addReceipt.mockReturnValue(
      Promise.resolve([fakeCreatedReceiptWithWarranty.id])
    )
    db.addWarranty.mockReturnValue(
      Promise.resolve([fakeCreatedReceiptWithWarranty.warrantyId])
    )
    db.getReceipt.mockReturnValue(
      Promise.resolve(fakeCreatedReceiptWithWarranty)
    )

    expect.assertions(2)

    return request(server)
      .post(receiptsUrl)
      .send(fakeCreatedReceiptWithWarranty)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expected)
      })
  })

  it('returns status 500 and error when database function fails', () => {
    // *** CASE 1: db.addReceipt fails ***
    db.addReceipt.mockImplementation(() => Promise.reject(new Error()))

    // *** CASE 2: db.addWarranty fails ***
    // db.addReceipt.mockReturnValue(
    //   Promise.resolve([fakeCreatedReceiptWithWarranty.id])
    // )
    // db.addWarranty.mockImplementation(() => Promise.reject(new Error()))

    // *** CASE 3: db.getReceipt fails ***
    // db.addReceipt.mockReturnValue(
    //   Promise.resolve([fakeCreatedReceiptWithWarranty.id])
    // )
    // db.addWarranty.mockReturnValue(
    //   Promise.resolve([fakeCreatedReceiptWithWarranty.warrantyId])
    // )
    // db.getReceipt.mockImplementation(() => Promise.reject(new Error()))

    return request(server)
      .post(receiptsUrl)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('Server Error')
      })
  })
})

// *** TO DO ***
// describe('PATCH api/v1/receipts', () => {})

// describe('DELETE api/v1/receipts', () => {})
