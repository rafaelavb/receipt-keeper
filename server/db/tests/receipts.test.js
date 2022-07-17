const config = require('../knexfile')
const knex = require('knex')
const { getReceipt /*getReceipts*/ } = require('../receipts')
// const { test } = require('./knexfile')
const testDb = knex(config.test)

beforeAll(() => {
  return testDb.migrate.latest()
})
beforeEach(() => {
  return testDb.seed.run()
})

describe('getReceiptById', () => {
  it('returns a single receipt by id', () => {
    expect.assertions(2)
    // getReceipts.mockImplementation(() =>
    return getReceipt(1, testDb).then((receipt) => {
      expect(receipt.id).toBe(1)
      expect(receipt.name).toBe('TV')
    })
  })
})

// describe('getAnAuth0Id', () => {
//   it('returns all receipts from an auth user', () => {
//     expect.assertions(1)
//     return getReceipts('auth0|62ce51224e478f1e65cfb444', testDb).then(
//       (receipts) => {
//         expect(receipts).toBeNull()
//       }
//     )
//   })
// })
