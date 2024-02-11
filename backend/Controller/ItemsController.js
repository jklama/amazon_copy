const Item = require('../Model/ItemModel')
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler')
const ApiFilters = require('../utils/apiFilters')

const allItems = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4
  const apiFilters = new ApiFilters(Item, req.query).search().filter()

  let items = await apiFilters.query
  let filterItemsCount = items.Length

  apiFilters.pagination(resPerPage)
  items = await apiFilters.query.clone()

  if (!items) {
    return res.status(404).json({
      success: false,
      message: 'No items found',
    })
  }
  res.status(200).json({
    resPerPage,
    filterItemsCount,
    items,
  })
})

const newItems = catchAsyncErrors(async (req, res) => {
  const items = await Item.create(req.body)
  res.status(201).json({
    success: true,
    items,
  })
})

const singleItem = catchAsyncErrors(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    return next(new ErrorHandler('product not found', 404))
  } else {
    res.status(200).json({
      success: true,
      item,
    })
  }
})

const updateItem = catchAsyncErrors(async (req, res, next) => {
  let item = await Item.findById(req.params.id)
  if (!item) {
    return next(new ErrorHandler('product not found', 404))
  }
  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  })
  res.status(200).json({
    success: true,
    item,
  })
})

const deleteItem = catchAsyncErrors(async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id)
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    })
  } else {
    return res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
    })
  }
})

module.exports = { allItems, newItems, singleItem, updateItem, deleteItem }
