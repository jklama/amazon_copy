const Item = require('../Model/ItemModel')

const allItems = async (req, res) => {
  const items = await Item.find()
  res.status(200).json({
    status: 'success',
    message: 'All Items',
    items,
  })
}

const newItems = async (req, res) => {
  const items = await Item.create(req.body)
  res.status(201).json({
    success: true,
    items,
  })
}

const singleItem = async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    })
  } else {
    return res.status(200).json({
      success: true,
      item,
    })
  }
}
module.exports = { allItems, newItems, singleItem }
