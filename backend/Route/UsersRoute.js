const express = require('express')

const router = express.Router()
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
} = require('../Controller/UserController')

router.route('/users/register').post(registerUser)
router.route('/users/login').post(loginUser)
router.route('/users/logout').get(logout)
router.route('/users/password/forgot').post(forgotPassword)
module.exports = router
