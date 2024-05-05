const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let unknownError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later"
  }

  if (err.name === "ValidationError") {
    unknownError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    unknownError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name === "CastError") {
    unknownError.msg = `No item with id ${err.value}`
    unknownError.statusCode = StatusCodes.NOT_FOUND
  }

  if (err.code && err.code === 11000) {
    unknownError.statusCode = StatusCodes.BAD_REQUEST,
    unknownError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field!`
  }
  return res.status(unknownError.statusCode).json( {err:unknownError.msg} )
}

module.exports = errorHandlerMiddleware
