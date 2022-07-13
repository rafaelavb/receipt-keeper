const express = require('express')
const path = require('path')

const receiptRoutes = require('./routes/routes')
const userRoutes = require('./routes/users')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/receipts', receiptRoutes)
server.use('/api/v1/users', userRoutes)

server.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public'))
})

module.exports = server
