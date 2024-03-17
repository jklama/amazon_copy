const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],

    paymentMethod: {
      type: String,
      required: [true, 'please select a payment method'],
      enum: {
        values: ['COD', 'Card'],
        message: 'please select a valid payment method',
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ['Processing', 'Shipped', 'Delivered'],
        message: 'Please select: COD or Card',
      },
      default: 'Processing',
    },

    deliveredAt: Date,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
