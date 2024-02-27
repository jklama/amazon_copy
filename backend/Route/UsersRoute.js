const express = require('express')

const router = express.Router()
const {
  registerUser,
  loginUser,
  logout,
} = require('../Controller/UserController')

router.route('/users/register').post(registerUser)
router.route('/users/login').post(loginUser)
router.route('/users/logout').get(logout)

module.exports = router
