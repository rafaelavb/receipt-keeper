const config = require('../knexfile')
const knex = require('knex')
const testDb = knex(config.test)

const db = require('../categories')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getCategories', () => {
  it('returns predefined cateogories from database', async () => {
    expect.assertions(4)

    const actual = await db.getCategories(testDb)

    expect(actual).toHaveLength(8)
    expect(actual[1].categoryType).toBe('Software')
    expect(actual[3].categoryType).toBe('Firmware')
    expect(actual[7].categoryType).toBe('Whiteware')
  })
})
