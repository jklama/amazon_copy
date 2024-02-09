const Item = require('../Model/ItemModel')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' })
const PORT = process.env.PORT || 5000

const items = require('./data')
const seedProducts = async () => {
  try {
    // Increase timeout for deleteMany operation to 30 seconds (30000 milliseconds)
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon')
    await Item.deleteMany()
    console.log('Items have been deleted')
    await Item.insertMany(items)
    console.log('All products have been added')
    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedProducts()
