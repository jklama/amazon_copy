const express = require('express')
const isAuthenticated = require('../middleware/auth')
const router = express.Router()
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  getUserProfile,
  updatePassword,
} = require('../Controller/UserController')

router.route('/users/register').post(registerUser)
router.route('/users/login').post(loginUser)
router.route('/users/logout').get(logout)
router.route('/users/password/forgot').post(forgotPassword)
router.route('/users/password/update').post(updatePassword)

router.route('/users/me').get(getUserProfile)

module.exports = router
