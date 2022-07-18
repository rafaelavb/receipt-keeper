import { it } from 'date-fns/locale'
import nock from 'nock'

import {getReceipts} from '../receipts'

const receiptsUrl = '/api/v1/receipts'



describe('GET /api/v1/receipts', () => {
  it.todo('Send GET request to server and return a list of receipts', () => {
    const scope = nock('http://localhost')
                .get(receiptsUrl)
                .reply(200,  )

                return getReceipts(token).then(res) =>{
                  expect(res).toBe(expectedOutput)
                }
  })
  it.todo('Log the error message when the request failed', () => {

  })
})
