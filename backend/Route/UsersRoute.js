const express = require('express')

const router = express.Router()
const { registerUser, loginUser } = require('../Controller/UserController')

router.route('/users/register').post(registerUser)
router.route('/users/login').post(loginUser)
module.exports = router
