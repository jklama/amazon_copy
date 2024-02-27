const asyncHandler = require('express-async-handler')
const ErrorHandler = require('../utils/errorHandler')
const User = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies
  console.log(token)
  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401))
  }
  //TODO: this adds the decoded data of user
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  //TODO: this adds the current user to the data
  req.user = await User.findById(decodedData.id)

  next()
}

module.exports = { isAuthenticated }
