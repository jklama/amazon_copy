const express = require('express')
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' })
const app = express()
const connectDatabase = require('./config/database')
app.use(express.json())

connectDatabase()
app.listen(5000, () => {
  console.log('Server is running on port 3000')
})
const Items = require('./Route/ItemsRoute')
app.use('/api/v1', Items)
