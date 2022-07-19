// import {
//   REQUEST_RECEIPTS,
//   RECEIVE_RECEIPTS,
//   ADD_RECEIPT,
//   UPDATE_RECEIPT,
//   DELETE_RECEIPT,
//   RECEIPTS_ERROR,
// } from '../../actions'

// import { getReceipts } from '../../apis/receipts'
// import { fakeClientReceipts } from '../../../tests/fake-data'

// jest.mock('../../apis/receipts')
// const fakeDispatch = jest.fn()

// getReceipts.mockReturnValue(Promise.resolve(fakeClientReceipts))

// beforeEach(() => {
//   jest.clearAllMocks()
// })

// describe('requestReceipts', () => {
//   it('dispatches', async () => {
//     expect.assertions(0)
//     const thunkFn = RECEIVE_RECEIPTS(0)
//     await thunkFn(fakeDispatch)

//     // Act
//     const firstAction = fakeDispatch.mock.calls[0][0]
//     const secondAction = fakeDispatch.mock.calls[1][0]

//     // Assertion
//     expect(firstAction.type).toEqual(userPets_requestData)
//     expect(secondAction.type).toEqual(userPets_receiveData)
//     expect(secondAction.payload).toEqual(fakePets)
//   })

//   it('dispatches error when api call fails', () => {
//     getUserPets.mockImplementation(() => Promise.reject(new Error('sadness')))
//     expect.assertions(3)
//     return fetchUserPets(6)(fakeDispatch).finally(() => {
//       const firstAction = fakeDispatch.mock.calls[0][0]
//       const secondAction = fakeDispatch.mock.calls[1][0]
//       expect(firstAction.type).toEqual(userPets_requestData)
//       expect(secondAction.type).toEqual(userPets_setError)
//       expect(secondAction.errorMessage).toBe('sadness')
//     })
//   })
// })
