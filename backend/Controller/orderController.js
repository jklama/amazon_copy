const Order = require('../Model/order')
const ErrorHandler = require('../utils/errorHandler')
const Items = require('../Model/ItemModel') 

//Create new Order => /api/v3/orders/new
//TODO: this is not working 
const newOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  })

  res.status(200).json({
    order,
  })
}


//Get order details => /api/v3/orders/:id
const getOrderDetails = async (req, res, next) =>{
  //this populate populates your order with user name and email
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404))
  }
  res.status(200).json({
    order,
  })

}

//get current user orders => /api/v3/me/orders
const myOrders = async (req, res, next) => {
  const orders = await Order.find({user: req.user._id})
  if(!orders) {
    return next(new ErrorHandler('No orders found with this user', 404))
  }
  
  res.status(200).json({
    orders,
  })
}

//get all orders - admin => /api/v3/admin/orders
const allOrders = async(req,res,next) =>{
  const orders = await Order.find();
  res.status(200).json({
    orders,
  })
}

//update order - admin => /api/v3/admin/orders/update

const updateOrders = async(req,res,next) =>{
  const orders = await Order.findById(req.params.id);
  if(!orders) {
    return next(new ErrorHandler('No orders found', 404))
  }
  if(order?.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400))
  } 
  
  //Update item stock
  order?.orderItems?.forEach(async(product)=>{
    const item = await Items.findById(product?.item?.toString())
    if(!item){
      return next(new ErrorHandler('Item not found', 404)) 
    }
  
    item.stock = item.stock - quantity
    await item.save()
  })
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now()
  
  res.status(200).json({
    orders,
  })  
}

//delete order - admin => /api/v3/admin/orders/delete

const deleteOrders = async(req,res,next) =>{
  const order = await Order.findById(req.params.id);
  if(!order) {
    return next(new ErrorHandler('No orders found', 404))
  }
  await order.deleteOne()
  res.status(200).json({
    success: true,
    message: 'Order deleted successfully'
  })
}

module.exports = {newOrder, getOrderDetails, myOrders, allOrders, updateOrders, deleteOrders}
