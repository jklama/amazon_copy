const catchAsyncErrors = require('../middleware/catchAsyncError')
const User = require('../Model/UserModel')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken')

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
  })
  sendToken(user, 201, res)
})

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body

  // checking if user has given password and email both}
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter Email & Password', 400))
  }
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }
  sendToken(user, 201, res)
  const token = user.getJWTToken()

  res.status(201).json({
    success: true,
    token,
    user,
  })
})

module.exports = {
  registerUser,
  loginUser,
}
