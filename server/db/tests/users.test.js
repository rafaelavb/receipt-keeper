const config = require('../knexfile')
const knex = require('knex')
const testDb = knex(config.test)

const db = require('../users')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('userExists', () => {})

describe('getUserByName', () => {})

describe('getUsername', () => {})

describe('createUser', () => {})
