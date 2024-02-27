const express = require('express')
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' })
const app = express()
const cookieParser = require('cookie-parser')
const connectDatabase = require('./config/database')
const errors = require('./middleware/error')
app.use(express.json())
app.use(cookieParser())
// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to uncaught exception')
  process.exit(1)
})

connectDatabase()
const Items = require('./Route/ItemsRoute')
const Users = require('./Route/UsersRoute')
app.use('/api/v1', Items)
app.use('/api/v2', Users)
app.use(errors)

const server = app.listen(5000, () => {
  console.log(
    `Server is running on http://localhost:${5000} and on ${
      process.env.NODE_ENV
    } mode`
  )
})

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`)
  console.log('Shutting down the server due to unhandled promise rejection')
  server.close(() => {
    process.exit(1)
  })
})
