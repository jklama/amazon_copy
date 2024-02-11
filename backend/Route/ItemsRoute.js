const express = require('express')
const router = express.Router()

const {
  allItems,
  newItems,
  singleItem,
  updateItem,
  deleteItem,
} = require('../Controller/ItemsController')

router.route('/Items').get(allItems)
router.route('/Items/new').post(newItems)
router.route('/Items/:id').get(singleItem)
router.route('/Items/:id').put(updateItem)
router.route('/Items/:id').delete(deleteItem)
module.exports = router
