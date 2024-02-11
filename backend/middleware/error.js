const ErrorHandler = require('../utils/errorHandler.js')

module.exports = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || 'Internal server error',
  }
  // err.statusCode = err.statusCode || 500
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    })
  }
  if (process.env.NODE_ENV === 'production') {
    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal server error',
    })
  }
  err.message = err.message || 'Internal server error'
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`
    error = new ErrorHandler(message, 400)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message)
    error = new ErrorHandler(message, 400)
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  })
}
