const mongoose = require('mongoose')
const dotenv = require('dotenv').config({ path: './config.env' })
const mongoo = process.env.MONGO_URI || 'mongodb://localhost:27017/amazon'
const connectDatabase = () => {
  mongoose
    .connect(mongoo)
    .then((con) => {
      console.log(con.connection.host)
      console.log('Database Connected')
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = connectDatabase
