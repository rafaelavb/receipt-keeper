const config = require('../knexfile')
const knex = require('knex')
const { getReceipt, addReceipt /*getReceipts*/ } = require('../receipts')
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

describe('addReceipt', () => {
  it('posts a single receipt to the db', () => {
    const testReceipt = {
      auth0_id: 'auth0|62d1e54bb624cf5ad8865601',
      name: 'Groceries',
      image: 'anImage.jpeg',
      purchase_date: '12 - 07 - 2022',
      store: 'Countdown',
      price: '234.56',
      category_id: 'Food',
      note: 'Food is expensive',
    }
    expect.assertions(3)
    return addReceipt(testReceipt, testDb).then(() => {
      // eslint-disable-next-line promise/no-nesting
      return testDb('receipts')
        .select()
        .then((receipt) => {
          const newestReceipt = receipt[receipt.length - 1]
          expect(newestReceipt.auth0_id).toBe('auth0|62d1e54bb624cf5ad8865601')
          expect(newestReceipt.image).toBe('anImage.jpeg')
          expect(newestReceipt.name).toBe('Groceries')
        })
    })
  })
})
