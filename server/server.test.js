const request = require('supertest')
const server = require('./server')

describe('GET /api/v1/1234', () => {
  it('returns 404 status', () => {
    return request(server)
      .get('/api/v1/*')
      .then((res) => {
        expect(res.status).toBe(404)
      })
  })
})
