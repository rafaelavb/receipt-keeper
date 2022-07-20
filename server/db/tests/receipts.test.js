const config = require('../knexfile')
const knex = require('knex')
const testDb = knex(config.test)

const db = require('../receipts')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getReceipts', () => {
  it('returns a list of receipts based on auth0Id', () => {
    expect.assertions(8)

    return db.getReceipts('auth0|random', testDb).then((actual) => {
      expect(actual).toHaveLength(4)
      expect(actual[0].id).toBe(1)
      expect(actual[1].price).toBe(2300)
      expect(actual[2].warrantyId).toBe(3)
      expect(actual[2].expiryDate).toBeNull()
      expect(actual[2].warrantyPeriod).toBeNull()
      expect(actual[3].categoryType).toBe('Spyware')
      expect(actual[3].warrantyPeriodUnit).not.toBeNull()
    })
  })
})

describe('getReceiptById', () => {
  it('returns a single receipt by id', () => {
    // expect.assertions(2)

    return db.getReceipt(3, testDb).then((actual) => {
      expect(actual.id).toBe(3)
      expect(actual.name).toBe('Microwave')
      expect(actual.purchaseDate).toBe('10/06/2021')
      expect(actual.categoryType).toBe('Hardware')
      expect(actual.note).toBe('Expensive microwave')
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
  it.skip('posts a single receipt to the db', () => {
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
