import {
  RECEIVE_RECEIPTS,
  REQUEST_RECEIPTS,
  RECEIPTS_ERROR,
  fetchReceipts,
} from '../../actions'

import { getReceipts } from '../../apis/receipts'
import { fakeClientReceipts } from '../../../tests/fake-data'

jest.mock('../../apis/receipts')
const fakeDispatch = jest.fn()

getReceipts.mockReturnValue(Promise.resolve(fakeClientReceipts))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('requestReceipts', () => {
  it('dispatches', async () => {
    expect.assertions(3)
    const thunkFn = fetchReceipts(0)
    await thunkFn(fakeDispatch)

    //     // Act
    const firstAction = fakeDispatch.mock.calls[0][0]
    const secondAction = fakeDispatch.mock.calls[1][0]

    //     // Assertion
    expect(firstAction.type).toEqual(REQUEST_RECEIPTS)
    expect(secondAction.type).toEqual(RECEIVE_RECEIPTS)
    expect(secondAction.payload).toEqual(fakeClientReceipts)
  })

  it('dispatches error when api call fails', () => {
    getReceipts.mockImplementation(() => Promise.reject(new Error('uh oh!')))
    expect.assertions(3)
    return fetchReceipts(0)(fakeDispatch).finally(() => {
      const firstAction = fakeDispatch.mock.calls[0][0]
      const secondAction = fakeDispatch.mock.calls[1][0]
      expect(firstAction.type).toEqual(REQUEST_RECEIPTS)
      expect(secondAction.type).toEqual(RECEIPTS_ERROR)
      expect(secondAction.error).toContain('uh oh!')
    })
  })
})
