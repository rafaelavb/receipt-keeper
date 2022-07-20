const request = require('supertest')
const server = require('../../server')
const db = require('../../db/')
const checkJwt = require('../../auth0')

import { fakePostUser, fakeUsersList } from '../../../tests/fake-data'

jest.mock('../../db/')
jest.mock('../../auth0')

beforeAll(() => {
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: fakeUsersList[1].auth0_id }
    next()
  })
})

const usersUrl = '/api/v1/users'

describe('GET /api/v1/users/username', () => {
  it('returns the username based on auth0 ID', async () => {
    db.getUsername.mockReturnValue(Promise.resolve(fakeUsersList[1].auth0_id))

    expect.assertions(2)
    const response = await request(server).get(`${usersUrl}/username`)
    const actual = response.body

    expect(response.status).toBe(200)
    expect(actual).toEqual(fakeUsersList[1].auth0_id)
  })

  it('returns status 500 and error when database function fails', async () => {
    db.getUsername.mockImplementation(() => Promise.reject(new Error()))

    expect.assertions(2)
    const response = await request(server).get(`${usersUrl}/username`)

    expect(response.status).toBe(500)
    expect(response.text).toBe('Server Error')
  })
})

describe('POST /api/v1/users', () => {
  it('adds a new user to the database', async () => {
    db.createUser.mockReturnValue(
      Promise.resolve([...fakeUsersList, fakePostUser])
    )

    expect.assertions(1)
    const response = await request(server).post(usersUrl).send(fakePostUser)

    expect(response.status).toBe(201)
  })

  it('returns status 500 and error when database function fails', async () => {
    db.createUser.mockImplementation(() => Promise.reject(new Error()))

    expect.assertions(2)
    const response = await request(server).post(usersUrl)

    expect(response.status).toBe(500)
    expect(response.text).toBe('Server Error')
  })
})
