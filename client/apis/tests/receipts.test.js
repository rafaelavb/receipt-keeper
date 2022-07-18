import nock from 'nock'

import { getReceipts } from '../receipts'

import { fakeClientReceipts } from '../../../tests/fake-data'

const receiptsUrl = '/api/v1/receipts'

describe('getReceipts', () => {
  it('sends GET request to server and returns a list of receipts', () => {
    const scope = nock('http://localhost')
      .get(receiptsUrl)
      .reply(200, fakeClientReceipts)

    expect.assertions(2)
    return getReceipts('fakeToken').then((res) => {
      expect(res).toEqual(fakeClientReceipts)
      expect(scope.isDone()).toBe(true)
      return null
    })
  })

  it('logs the error message when the request failed', () => {
    const scope = nock('http://localhost')
      .get(receiptsUrl)
      .reply(500, 'Server Error')

    let error = null
    expect.assertions(4)
    return getReceipts('fakeToken')
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

// ** TO DO **
describe('postReceipt', () => {})

describe('patchReceipt', () => {})

describe('deleteReceipt', () => {})
