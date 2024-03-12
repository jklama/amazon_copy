const asyncHandler = require('express-async-handler')
const User = require('../Model/UserModel')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const getResetPasswordTemplate = require('../utils/emailTemplates')

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'this is a sample id',
      url: 'profilepicUrl',
    },
  })
  const token = user.getJWTToken()

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  res.status(201).cookie('token', token, options).json({
    success: true,
    token,
    user,
  })
})

const loginUser = async (req, res, next) => {
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

  sendToken(user, 200, res)
}

//TODO: creating logout

const logout = async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  })
}

//forgot password => /api/v2/users/password/forgot
const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken()
  await user.save()

  const resetUrl = `${process.env.FRONTEND_URL}/api/v2/users/password/reset/${resetToken}`

  const message = getResetPasswordTemplate(user?.name, resetUrl)
  console.log('Reset URL:', resetUrl)
  try {
    console.log('Sending email...')
    await sendEmail({
      email: user.email,
      subject: `shopIt Password Recovery`,
      message,
    })
    console.log('Email sent successfully')
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error) {
    console.error('error: ', error)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message, 500))
  }
}

//get current user profile => /api/v2/users/me
// TODO: Not working currently
const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req?.user?._id)
  console.log(user)
  res.status(200).json({
    user,
  })
}

//UPdate password => /api/v2/users/password/update
// TODO: NOt working this too
const updatePassword = async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select('+password')
  const oldPassword = req.body
  const isMatched = await user.comparePassword(oldPassword)

  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400))
  }

  user.password = req.body.password
  user.save()
  res.status(200).json({
    success: true,
  })
}

module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  getUserProfile,
  updatePassword,
}
