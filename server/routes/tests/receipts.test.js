const request = require('supertest')
const server = require('../../server')
const db = require('../../db/')

const checkJwt = require('../../auth0')
import {
  fakeClientReceipts,
  fakePostReceiptWithWarranty,
  fakeCreatedReceiptWithWarranty,
  fakePatchedReceipt,
  fakePatchReceipt,
  fakeReceipt,
} from '../../../tests/fake-data'

jest.mock('../../db/')
jest.mock('../../auth0')

beforeAll(() => {
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: fakeClientReceipts.auth0Id }
    next()
  })
})

const receiptsUrl = '/api/v1/receipts'

describe('GET /api/v1/receipts', () => {
  it('returns all receipts from the db', () => {
    db.getReceipts.mockReturnValue(Promise.resolve(fakeClientReceipts))
    const expected = fakeClientReceipts.map((receipt) => ({
      ...receipt,
      image: JSON.parse(receipt.image),
    }))

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
  it('adds and returns a new receipt with warranty', () => {
    db.addReceipt.mockReturnValue(
      Promise.resolve([fakeCreatedReceiptWithWarranty.id])
    )
    db.addWarranty.mockReturnValue(Promise.resolve())
    db.getReceipt.mockReturnValue(
      Promise.resolve(fakeCreatedReceiptWithWarranty)
    )
    const expected = {
      ...fakeCreatedReceiptWithWarranty,
      image: JSON.parse(fakeCreatedReceiptWithWarranty.image),
    }

    expect.assertions(2)

    return request(server)
      .post(receiptsUrl)
      .send(fakePostReceiptWithWarranty)
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
    //   Promise.resolve()
    // )
    // db.addWarranty.mockImplementation(() => Promise.reject(new Error()))

    // *** CASE 3: db.getReceipt fails ***
    // db.addReceipt.mockReturnValue(
    //   Promise.resolve()
    // )
    // db.addWarranty.mockReturnValue(
    //   Promise.resolve()
    // )
    // db.getReceipt.mockImplementation(() => Promise.reject(new Error()))

    expect.assertions(2)

    return request(server)
      .post(receiptsUrl)
      .send(fakePostReceiptWithWarranty)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('Server Error')
      })
  })
})

describe('PATCH api/v1/receipts', () => {
  it('updates and returns a patched receipt', () => {
    db.updateReceipt.mockReturnValue(Promise.resolve())
    db.updateWarranty.mockReturnValue(Promise.resolve())
    db.getReceipt.mockReturnValue(Promise.resolve(fakePatchedReceipt))
    const expected = {
      ...fakePatchedReceipt,
      image: JSON.parse(fakePatchedReceipt.image),
    }

    expect.assertions(2)

    return request(server)
      .patch(receiptsUrl)
      .send(fakePatchReceipt)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expected)
      })
  })

  it('returns status 500 and error when database function fails', () => {
    // *** CASE 1: db.updateReceipt fails ***
    db.updateReceipt.mockImplementation(() => Promise.reject(new Error()))

    // *** CASE 2: db.updateWarranty fails ***
    // db.updateReceipt.mockReturnValue(Promise.resolve())
    // db.updateWarranty.mockImplementation(() => Promise.reject(new Error()))

    // *** CASE 3: db.getReceipt fails ***
    // db.updateReceipt.mockReturnValue(Promise.resolve())
    // db.updateWarranty.mockReturnValue(Promise.resolve())
    // db.getReceipt.mockImplementation(() => Promise.reject(new Error()))

    expect.assertions(2)

    return request(server)
      .patch(receiptsUrl)
      .send(fakePatchReceipt)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('Server Error')
      })
  })
})

// *** TO DO ***
describe('DELETE api/v1/receipts', () => {
  it('deletes the receipt and returns the id of the receipt', () => {
    checkJwt.mockImplementation((req, res, next) => {
      req.user = { sub: fakeReceipt.auth0Id }
      next()
    })
    db.deleteReceipt.mockImplementation(() => Promise.resolve())
    db.deleteWarranty.mockImplementation(() => Promise.resolve())
    const expected = fakeReceipt.id

    expect.assertions(2)

    return request(server)
      .delete(receiptsUrl)
      .send(fakeReceipt)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toBe(expected)
      })
  })

  it('returns status 500 and error when database function fails', () => {
    checkJwt.mockImplementation((req, res, next) => {
      req.user = { sub: fakeReceipt.auth0Id }
      next()
    })

    // *** CASE 1: db.deleteReceipt fails ***
    db.deleteReceipt.mockImplementation(() => Promise.reject(new Error()))

    // *** CASE 2: db.deleteWarranty fails ***
    // db.deleteReceipt.mockReturnValue(Promise.resolve())
    // db.deleteWarranty.mockImplementation(() => Promise.reject(new Error()))

    expect.assertions(2)

    return request(server)
      .delete(receiptsUrl)
      .send(fakeReceipt)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('Server Error')
      })
  })
})
