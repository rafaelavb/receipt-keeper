const config = require('../knexfile')
const knex = require('knex')
const testDb = knex(config.test)

const db = require('../warranties')
const {
  fakePostReceiptWithWarranty,
  fakeCreatedReceiptWithWarranty,
  fakePatchReceipt,
  fakePatchedReceipt,
  fakePostReceiptWithNoWarranty,
  fakeCreatedReceiptWithNoWarranty,
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

describe('addWarranty', () => {
  it('adds a new warranty record with warranty information to the db', async () => {
    expect.assertions(4)

    await db.addWarranty(
      fakePostReceiptWithWarranty,
      fakeCreatedReceiptWithWarranty.id,
      testDb
    )

    const warranties = await testDb('warranties').select()
    const actual = warranties[warranties.length - 1]

    expect(warranties).toHaveLength(5)
    expect(actual.expiry_date).toEqual(
      fakeCreatedReceiptWithWarranty.expiryDate
    )
    expect(actual.period).toEqual(fakeCreatedReceiptWithWarranty.warrantyPeriod)
    expect(actual.period_unit).toEqual(
      fakeCreatedReceiptWithWarranty.warrantyPeriodUnit
    )
  })

  it('adds a new warranty record with no warranty information to the db', async () => {
    expect.assertions(4)

    await db.addWarranty(
      fakePostReceiptWithWarranty,
      fakeCreatedReceiptWithWarranty.id,
      testDb
    )

    await db.addWarranty(
      fakePostReceiptWithNoWarranty,
      fakeCreatedReceiptWithNoWarranty.id,
      testDb
    )

    const warranties = await testDb('warranties').select()
    const actual = warranties[warranties.length - 1]

    expect(warranties).toHaveLength(6)
    expect(actual.expiry_date).toEqual(
      fakeCreatedReceiptWithNoWarranty.expiryDate
    )
    expect(actual.period).toEqual(
      fakeCreatedReceiptWithNoWarranty.warrantyPeriod
    )
    expect(actual.period_unit).toEqual(
      fakeCreatedReceiptWithNoWarranty.warrantyPeriodUnit
    )
  })
})

describe('updateWarranty', () => {
  it('updates warranty information based on waranty ID', async () => {
    expect.assertions(4)

    await db.updateWarranty(fakePatchReceipt, testDb)
    const actual = await testDb('warranties')
      .select()
      .where({ id: fakePatchedReceipt.id })
      .first()

    expect(actual.id).toEqual(fakePatchedReceipt.id)
    expect(actual.expiry_date).toEqual(fakePatchedReceipt.expiryDate)
    expect(actual.period).toEqual(fakePatchedReceipt.warrantyPeriod)
    expect(actual.period_unit).toEqual(fakePatchedReceipt.warrantyPeriodUnit)
  })
})

describe('deleteWarranty', () => {
  it('deletes a warranty record by warranty ID', async () => {
    expect.assertions(1)

    await db.deleteWarranty(fakeReceiptToDelete, testDb)
    const actual = await testDb('warranties').select()

    expect(actual).toHaveLength(3)
  })
})
