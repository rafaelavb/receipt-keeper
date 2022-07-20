const request = require('supertest')
const server = require('../../server')
const db = require('../../db/')
const checkJwt = require('../../auth0')

jest.mock('../../db/')
jest.mock('../../auth0')

beforeAll(() => {
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: 'auth0|random' }
    next()
  })
})

const usersUrl = '/api/v1/users'

describe('GET /username', () => {
  it.skip('returns the username based on auth0 ID', async () => {
       
    
    expect.assertions(1)

    // it('returns all receipts from the db', () => {
    //   db.getReceipts.mockReturnValue(Promise.resolve(fakeClientReceipts))
    //   const expected = fakeClientReceipts.map((receipt) => ({
    //     ...receipt,
    //     image: JSON.parse(receipt.image),
    //   }))

    //   expect.assertions(2)

    //   return request(server)
    //     .get(receiptsUrl)
    //     .then((res) => {
    //       expect(res.status).toBe(200)
    //       expect(res.body).toEqual(expected)
    //     })

    // try {
    //   const username = await db.getUsername(auth0Id)
    //   res.json(username)
    // } catch (err) {
    //   console.log(err)
    //   res.status(500).send(err.message)
    // }
  })
})
