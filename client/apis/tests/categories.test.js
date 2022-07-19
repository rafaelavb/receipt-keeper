import nock from 'nock'
import { getCategories } from '../categories'

const localHost = 'http://localhost'
const categoriesUrl = '/api/v1/categories'

describe('getCategories', () => {
  it('returns a list of predefined categories', () => {
    const expectedCategories = [
      {
        categoryId: 1,
        categoryType: 'Hardware',
      },
      {
        categoryId: 2,
        categoryType: 'Software',
      },
      {
        categoryId: 3,
        categoryType: 'Whiteware',
      },
      {
        categoryId: 4,
        categoryType: 'Homeware',
      },
    ]
    const scope = nock(localHost)
      .get(categoriesUrl)
      .reply(200, expectedCategories)

    expect.assertions(2)
    return getCategories().then((res) => {
      expect(res).toEqual(expectedCategories)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('throws an error when the request failed', () => {
    const scope = nock(localHost).get(categoriesUrl).reply(500, {})

    expect.assertions(4)

    let error = null
    return getCategories()
      .catch((err) => {
        error = err
      })
      .finally(() => {
        expect(error).not.toBeNull()
        expect(error.status).toBe(500)
        expect(error.message).toBe('Internal Server Error')
        expect(scope.isDone()).toBe(true)
      })
  })
})
