const express = require('express')
const router = express.Router()
const { newOrder, getOrderDetails, myOrders ,allOrders,updateOrders, deleteOrders } = require('../Controller/orderController')

const { isAuthenticated } = require('../middleware/auth')
router.route('/orders/new').post(newOrder)
router.route('/orders/:id').get(getOrderDetails)
router.route('/me/orders').get(myOrders)
router.route('/admin/orders').get(allOrders) 
router.route('/admin/orders/:id').put(updateOrders).delete(deleteOrders)

module.exports = router
