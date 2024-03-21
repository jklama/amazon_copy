const Item = require('../Model/ItemModel')
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler')
const ApiFilters = require('../utils/apiFilters')

const allItems = async (req, res) => {
  const resPerPage = 4
  const apiFilters = new ApiFilters(Item, req.query).search().filter()
  console.log('req?.user', req?.user)
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
}

const newItems = async (req, res) => {
  //using the req.user._id from previous Mail
  req.body.user = req.user._id

  const items = await Item.create(req.body)
  res.status(201).json({
    success: true,
    items,
  })
}

const singleItem = async (req, res, next) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    return next(new ErrorHandler('product not found', 404))
  } else {
    res.status(200).json({
      success: true,
      item,
    })
  }
}

const updateItem = async (req, res, next) => {
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
}

const deleteItem = async (req, res) => {
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
}

// Create/Update Item => /api/v1/products/:id
const createItemReview = async (req, res) => {
  const { rating,comment,productId} = req.body
  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  }
  const item = await Item.findById(productId)
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    })
  }
  const isReviewed = item?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  )
  if (isReviewed) {
    item.reviews.forEach((review) => {
      if (review.user.toString() === req?.user?._id.toString()) {
        review.rating = rating
        review.comment = comment
      }
    })
  } else {
    item.reviews.push(review)
    item.numOfReviews = item.reviews.length
  }
 item.ratings = item.reviews.reduce((acc,product) => product.rating + acc, 0) / item.reviews.length;

 await item.save({  validateBeforeSave: false})
  res.status(200).json({
    success: true,   
    review,
  })   


// Get Product Reviews => /api/v1/products/:id/reviews

}

module.exports = { allItems, newItems, singleItem, updateItem, deleteItem, createItemReview }
