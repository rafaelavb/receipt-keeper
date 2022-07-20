const config = require('../knexfile')
const knex = require('knex')
const testDb = knex(config.test)

const db = require('../receipts')
const {
  fakePostReceiptWithWarranty,
  fakePatchReceipt,
  fakePatchedReceipt,
  fakeReceiptToDelete,
} = require('../../../tests/fake-data')

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
  it('returns a list of receipts by user ID (auth0 ID)', async () => {
    expect.assertions(8)

    const actual = await db.getReceipts('auth0|random', testDb)

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

describe('getReceipt', () => {
  it('returns a single receipt by receipt ID', async () => {
    expect.assertions(5)

    const actual = await db.getReceipt(3, testDb)

    expect(actual.id).toBe(3)
    expect(actual.name).toBe('Microwave')
    expect(actual.purchaseDate).toBe('10/06/2021')
    expect(actual.categoryType).toBe('Hardware')
    expect(actual.note).toBe('Expensive microwave')
  })
})

describe('addReceipt', () => {
  it('adds a single receipt to the db', async () => {
    expect.assertions(5)

    await db.addReceipt('auth0|random', fakePostReceiptWithWarranty, testDb)
    const receipts = await testDb('receipts').select()
    const actual = receipts[receipts.length - 1]

    expect(receipts).toHaveLength(5)
    expect(actual.auth0_id).toBe('auth0|random')
    expect(actual.name).toEqual(fakePostReceiptWithWarranty.name)
    expect(actual.image).toEqual(fakePostReceiptWithWarranty.image)
    expect(actual.purchase_date).toEqual(
      fakePostReceiptWithWarranty.purchaseDate
    )
  })
})

describe('updateReceipt', () => {
  it('update a receipt by user ID (auth0 ID) and receipt ID', async () => {
    expect.assertions(5)

    await db.updateReceipt('auth0|random', fakePatchReceipt, testDb)
    const actual = await testDb('receipts')
      .select()
      .where({ id: fakePatchReceipt.id })
      .first()

    expect(actual.name).toEqual(fakePatchedReceipt.name)
    expect(actual.store).toEqual(fakePatchedReceipt.store)
    expect(actual.purchase_date).toEqual(fakePatchedReceipt.purchaseDate)
    expect(actual.price).toEqual(fakePatchedReceipt.price)
    expect(actual.note).toEqual(fakePatchedReceipt.note)
  })
})

describe('deleteReceipt', () => {
  it('deletes a receipt by user ID (auth0 ID) and receipt ID', async () => {
    expect.assertions(4)

    await db.deleteReceipt('auth0|random', fakeReceiptToDelete, testDb)
    const actual = await testDb('receipts').select()

    expect(actual).toHaveLength(3)
    expect(actual[0].id).toBe(1)
    expect(actual[1].id).toBe(3)
    expect(actual[2].id).toBe(4)
  })
})
