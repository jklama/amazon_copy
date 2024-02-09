const express = require('express')
const router = express.Router()

const {
  allItems,
  newItems,
  singleItem,
} = require('../Controller/ItemsController')

router.route('/Items').get(allItems)
router.route('/Items/new').post(newItems)
router.route('/Items/:id').get(singleItem)
module.exports = router
