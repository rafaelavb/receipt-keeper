import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  CATEGORIES_ERROR,
  fetchCategories,
} from '../../actions'

import { getCategories } from '../../apis/categories'
import { fakeCategories } from '../../../tests/fake-data'

jest.mock('../../apis/categories')
const fakeDispatch = jest.fn()

getCategories.mockReturnValue(Promise.resolve(fakeCategories))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('requestCategories', () => {
  it('dispatches', async () => {
    expect.assertions(3)
    const thunkFn = fetchCategories(0)
    await thunkFn(fakeDispatch)

    //     // Act
    const firstAction = fakeDispatch.mock.calls[0][0]
    const secondAction = fakeDispatch.mock.calls[1][0]

    //     // Assertion
    expect(firstAction.type).toEqual(REQUEST_CATEGORIES)
    expect(secondAction.type).toEqual(RECEIVE_CATEGORIES)
    expect(secondAction.payload).toEqual(fakeCategories)
  })

  it('dispatches error when api call fails', () => {
    getCategories.mockImplementation(() => Promise.reject(new Error('uh oh!')))
    expect.assertions(3)
    return fetchCategories(0)(fakeDispatch).finally(() => {
      const firstAction = fakeDispatch.mock.calls[0][0]
      const secondAction = fakeDispatch.mock.calls[1][0]
      expect(firstAction.type).toEqual(REQUEST_CATEGORIES)
      expect(secondAction.type).toEqual(CATEGORIES_ERROR)
      expect(secondAction.error).toContain('uh oh!')
    })
  })
})
