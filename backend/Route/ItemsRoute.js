const express = require('express')
const router = express.Router()
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')
const {
  allItems,
  newItems,
  singleItem,
  updateItem,
  deleteItem,
} = require('../Controller/ItemsController')

router.route('/Items').get(allItems)
router
  .route('/Items/new')
  .post(isAuthenticated, authorizeRoles('admin'), newItems)
router.route('/Items/:id').get(singleItem)
router
  .route('/Items/:id')
  .put(isAuthenticated, authorizeRoles('admin'), updateItem)
router
  .route('/Items/:id')
  .delete(isAuthenticated, authorizeRoles('admin'), deleteItem)
module.exports = router
