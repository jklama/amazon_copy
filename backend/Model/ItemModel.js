//before addtion of users

// const mongoose = require('mongoose')

// const ItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please add a name'],
//     trim: true,
//     maxLength: [100, 'Product name cannot be more than 100 characters'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Please add a price'],
//     maxLength: [5, 'Product name cannot be more than 5 characters'],
//     default: 0.0,
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description'],
//     maxLength: [1000, 'Product name cannot be more than 1000 characters'],
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   category: {
//     type: String,
//     required: [true, 'Please add a category'],
//     enum: {
//       values: [
//         'Electronics',
//         'Cameras',
//         'Laptops',
//         'Accessories',
//         'Headphones',
//         'Food',
//         'Books',
//         'Clothes/Shoes',
//         'Beauty/Health',
//         'Sports',
//         'Outdoor',
//         'Home',
//       ],
//       message: 'Please select correct category for product',
//     },
//   },
//   seller: {
//     type: String,
//     required: [true, 'Please add a seller'],
//   },
//   stock: {
//     type: Number,
//     required: [true, 'Please add a stock'],
//     maxLength: [5, 'Product name cannot be more than 5 characters'],
//     default: 0,
//   },
//   numOfReviews: {
//     type: Number,
//     default: 0,
//   },
//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       name: {
//         type: String,
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//       },
//       comment: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// })

// module.exports = mongoose.model('Item', ItemSchema)

const mongoose = require('mongoose')
const User = require('./UserModel')
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxLength: [100, 'Product name cannot be more than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    maxLength: [5, 'Product name cannot be more than 5 characters'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxLength: [1000, 'Product name cannot be more than 1000 characters'],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select correct category for product',
    },
  },
  seller: {
    type: String,
    required: [true, 'Please add a seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please add a stock'],
    maxLength: [5, 'Product name cannot be more than 5 characters'],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Item', ItemSchema)
