import nock from 'nock'
import {
  deleteReceipt,
  getReceipts,
  patchReceipt,
  postReceipt,
} from '../receipts'
import {
  fakeClientReceipts,
  fakePostReceiptWithWarranty,
  fakeCreatedReceiptWithWarranty,
  fakePostReceiptWithNoWarranty,
  fakeCreatedReceiptWithNoWarranty,
  fakePatchedReceipt,
  fakePatchReceipt,
  fakeReceipt,
} from '../../../tests/fake-data'

const localHostUrl = 'http://localhost'
const receiptsUrl = '/api/v1/receipts'

describe('getReceipts', () => {
  it('sends GET request to server and returns a list of receipts', () => {
    const scope = nock(localHostUrl)
      .get(receiptsUrl)
      .reply(200, fakeClientReceipts)

    expect.assertions(2)

    return getReceipts('fakeToken').then((res) => {
      expect(res).toEqual(fakeClientReceipts)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('logs the error message when the request failed', () => {
    const scope = nock(localHostUrl).get(receiptsUrl).reply(500, {})

    expect.assertions(4)

    let error = null
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
describe('postReceipt', () => {
  it('returns a receipt with warranty', () => {
    const scope = nock(localHostUrl)
      .post(receiptsUrl, fakePostReceiptWithWarranty)
      .reply(201, fakeCreatedReceiptWithWarranty)

    expect.assertions(3)

    return postReceipt(fakePostReceiptWithWarranty, 'fakeToken').then((res) => {
      expect(res.id).toBe(4)
      expect(res).toEqual(fakeCreatedReceiptWithWarranty)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('returns a receipt with no warranty', () => {
    const scope = nock(localHostUrl)
      .post(receiptsUrl, fakePostReceiptWithNoWarranty)
      .reply(201, fakeCreatedReceiptWithNoWarranty)

    expect.assertions(2)

    return postReceipt(fakePostReceiptWithNoWarranty, 'fakeToken').then(
      (res) => {
        expect(res).toEqual(fakeCreatedReceiptWithNoWarranty)
        expect(scope.isDone()).toBe(true)
      }
    )
  })

  it('logs the error message when the request failed', () => {
    const scope = nock(localHostUrl).post(receiptsUrl).reply(500, {})

    expect.assertions(3)

    let error = null
    return postReceipt(fakePostReceiptWithWarranty, 'fakeToken')
      .catch((err) => {
        error = err
      })
      .finally(() => {
        expect(error).not.toBeNull()
        expect(error.message).toBe('Internal Server Error')
        expect(scope.isDone()).toBe(true)
      })
  })
})

describe('patchReceipt', () => {
  it('returns a patched/updated receipt', () => {
    const scope = nock(localHostUrl)
      .patch(receiptsUrl, fakePatchReceipt)
      .reply(201, fakePatchedReceipt)

    expect.assertions(2)

    return patchReceipt(fakePatchReceipt).then((res) => {
      expect(res).toEqual(fakePatchedReceipt)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('logs the error message when the request failed', () => {
    const scope = nock(localHostUrl)
      .patch(receiptsUrl, fakePatchReceipt)
      .reply(500, {})

    expect.assertions(3)

    let error = null
    return patchReceipt(fakePatchReceipt, 'fakeToken')
      .catch((err) => {
        error = err
      })
      .finally(() => {
        expect(error).not.toBeNull()
        expect(error.message).toBe('Internal Server Error')
        expect(scope.isDone()).toBe(true)
      })
  })
})

describe('deleteReceipt', () => {
  it('deletes a receipt', () => {
    const scope = nock(localHostUrl)
      .delete(receiptsUrl, fakeReceipt, 'fakeToken')
      .reply(201, fakeReceipt.id)

    expect.assertions(2)

    return deleteReceipt(fakeReceipt, 'fakeToken').then((res) => {
      expect(res).toBe(fakeReceipt.id)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('throws an error when the request failed', () => {
    const scope = nock(localHostUrl)
      .delete(receiptsUrl, fakeReceipt)
      .reply(500, {})

    expect.assertions(3)

    let error = null
    return deleteReceipt(fakeReceipt, 'fakeToken')
      .catch((err) => {
        error = err
      })
      .finally(() => {
        expect(error).not.toBeNull()
        expect(error.message).toBe('Internal Server Error')
        expect(scope.isDone()).toBe(true)
      })
  })
})
