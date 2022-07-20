import {
  RECEIVE_RECEIPTS,
  REQUEST_RECEIPTS,
  RECEIPTS_ERROR,
  ADD_RECEIPT,
  UPDATE_RECEIPT,
  fetchReceipts,
  updateReceipt,
  createReceipt,
  addReceipt,
} from '../../actions'

import { getReceipts, patchReceipt, postReceipt } from '../../apis/receipts'
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

// patchReceipt.mockReturnValue(Promise.resolve(fakeClientReceipts))

// beforeEach(() => {
//   jest.clearAllMocks()
// })

// describe('patchReceipts', () => {
//   it('dispatches', async () => {
//     expect.assertions(3)
//     const thunkFn = updateReceipt(1)
//     await thunkFn(fakeDispatch)

//     //     // Act
//     const firstAction = fakeDispatch.mock.calls[0][0]
//     const secondAction = fakeDispatch.mock.calls[1][0]

//     //     // Assertion
//     expect(firstAction.type).toEqual(UPDATE_RECEIPT)
//     expect(secondAction.type).toEqual(RECEIVE_RECEIPTS)
//     expect(secondAction.payload).toEqual(fakeClientReceipts)
//   })

//   it('dispatches error when api call fails', () => {
//     getReceipts.mockImplementation(() => Promise.reject(new Error('uh oh!')))
//     expect.assertions(3)
//     return updateReceipt(1)(fakeDispatch).finally(() => {
//       const firstAction = fakeDispatch.mock.calls[0][0]
//       const secondAction = fakeDispatch.mock.calls[1][0]
//       expect(firstAction.type).toEqual(UPDATE_RECEIPT)
//       expect(secondAction.type).toEqual(RECEIPTS_ERROR)
//       expect(secondAction.error).toContain('uh oh!')
//     })
//   })
// })

postReceipt.mockReturnValue(
  Promise.resolve([...fakeClientReceipts, { value: 'adding receipt' }])
)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('addReceipt', () => {
  it('dispatches', async () => {
    expect.assertions(3)
    const thunkFn = createReceipt({})
    await thunkFn(fakeDispatch)

    //     // Act
    const firstAction = fakeDispatch.mock.calls[0][0]
    const secondAction = fakeDispatch.mock.calls[0][1]

    //     // Assertion
    expect(firstAction.type).toEqual(ADD_RECEIPT)
    expect(firstAction.payload[4].value).toBe('adding receipt')
    expect(secondAction).toBeUndefined()
  })

  it('dispatches error when api call fails', () => {
    postReceipt.mockImplementation(() => Promise.reject(new Error('uh oh!')))
    expect.assertions(2)
    return createReceipt({})(fakeDispatch).finally(() => {
      const firstAction = fakeDispatch.mock.calls[0][0]
      console.log(firstAction.type)
      expect(firstAction.type).toEqual(RECEIPTS_ERROR)
      expect(firstAction.error).toContain('uh oh!')
    })
  })
})
