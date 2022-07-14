const request = require('supertest')
const server = require('../server')
const db = require('./receipts')

const { objReceipts } = require('../../tests/fake-data')
// const { checkJwt } = require('../server')

jest.mock('./receipts')
jest.mock('../server')

beforeAll(() => {
  jest.spyOn(console, 'log')
  console.log.mockImplementation(() => {})
  // checkJwt.mockImplementation((req, res, next) => {
  //   next()
  // })
})
afterAll(() => {
  console.log.mockRestore()
  jest.restoreAllMocks()
})

describe('GET /api/v1/receipts', () => {
  it('returns all receipts from the db', () => {
    expect.assertions(3)
    db.getReceipts.mockReturnValue(Promise.resolve(objReceipts))
    return request(server)
      .get('/api/v1/receipts')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('store')
        expect(res.body.receipts.store).toBe('Smiths City')
      })
  })
  it("should return status 500 and error when database doesn't work", () => {
    expect.assertions(2)
    db.getReceipts.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/receipts')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})

// describe('POST /api/pets', () => {
//   it('adds a pet to the database and returns the new pet', () => {
//     expect.assertions(1)
//     db.addPet.mockReturnValue(Promise.resolve([6]))
//     return request(server)
//       .post('/api/pets')
//       .send(dbNewPet)
//       .then((res) => {
//         expect(res.status).toBe(201)
//       })
//   })
//   it("should return status 500 and error when database doesn't work", () => {
//     expect.assertions(2)
//     db.addPet.mockImplementation(() =>
//       Promise.reject(new Error('Something went wrong'))
//     )
//     return request(server)
//       .post('/api/pets')
//       .send(dbNewPet)
//       .then((res) => {
//         expect(res.status).toBe(500)
//         expect(res.text).toContain('Something went wrong')
//       })
//   })
// })

// describe('PATCH/api/votes/add', () => {
//   it('rendering add page', () => {
//     expect.assertions(1)
//     db.addPoints.mockReturnValue(Promise.resolve(arrTwoPet))
//     return request(server)
//       .patch('/api/votes/add')
//       .then((res) => {
//         expect(res.status).toBe(200)
//       })
//   })
//   it('should return status 500 and error when database does not work', () => {
//     expect.assertions(2)
//     db.addPoints.mockImplementation(() => {
//       return Promise.reject(new Error('Something went wrong'))
//     })
//     return request(server)
//       .patch('/api/votes/add')
//       .then((res) => {
//         expect(res.status).toBe(500)
//         expect(res.text).toContain('Something went wrong')
//       })
//   })
// })

// describe('GET /my', () => {
//   test('gets the pets from the given userId', () => {
//     db.getPetsByUserId.mockReturnValue(Promise.resolve(arrTwoPet))

//     return request(server)
//       .get(`/api/pets/my`)
//       .then((res) => {
//         expect(res.body).toHaveLength(2)
//       })
//   })

//   it('tests error in routes', () => {
//     expect.assertions(1)
//     db.getPetsByUserId.mockImplementation(() =>
//       Promise.reject(new Error('not working'))
//     )
//     return request(server)
//       .get(`/api/pets/my`)
//       .then((res) => {
//         expect(res.status).toBe(500)
//       })
//   })
// })
