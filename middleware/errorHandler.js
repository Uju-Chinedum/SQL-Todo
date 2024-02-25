const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  // Custom Error Message
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    name: err.name || "Internal Server Error",
    message: err.message || "Something went wrong!! Please try again.",
  };

  // Validation Error
  if (
    err.code &&
    [
      "ER_NO_DEFAULT_FOR_FIELD",
      "ER_TRUNCATED_WRONG_VALUE",
      "ER_DATA_TOO_LONG",
    ].includes(err.code)
  ) {
    customError.name = "Validation Error";
    customError.message = err.message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Duplicate Error
  if (err.code && err.code === "ER_DUP_ENTRY") {
    // Extract duplicate key information from err.message
    const duplicateKey = err.message.match(/Duplicate entry '(.+)'/)[1];
    customError.name = "Duplicate Values";
    customError.message = `This ${duplicateKey} is already in use. Please use another.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Type Error
  if (
    err.code &&
    [
      "ER_BAD_FIELD_ERROR",
      "ER_TRUNCATED_WRONG_VALUE",
      "ER_DATA_TOO_LONG",
    ].includes(err.code)
  ) {
    customError.name = "Invalid Data Error";
    customError.message = err.message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ data: customError });
};

module.exports = errorHandler;
