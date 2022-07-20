const request = require('supertest')
const server = require('../../server')
const db = require('../../db/')
import { fakeCategories } from '../../../tests/fake-data'

jest.mock('../../db/')

const categoriesUrl = '/api/v1/categories'

describe('GET /api/v1/categories', () => {
  it('returns all predefined categories from the db', async () => {
    db.getCategories.mockReturnValue(Promise.resolve(fakeCategories))
    const expected = fakeCategories

    expect.assertions(2)

    return request(server)
      .get(categoriesUrl)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expected)
      })
  })

  it("returns status 500 and error when database doesn't work", () => {
    db.getCategories.mockImplementation(() => Promise.reject(new Error()))

    expect.assertions(2)

    return request(server)
      .get(categoriesUrl)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('Server Error')
      })
  })
})
