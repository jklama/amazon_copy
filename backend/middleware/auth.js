const asyncHandler = require('express-async-handler')
const ErrorHandler = require('../utils/errorHandler')
const User = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies
  console.log(token)
  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401))
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decodedData.id)

  next()
})

module.exports = { isAuthenticated }
