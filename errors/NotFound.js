const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class NotFound extends CustomError {
  constructor(name, message) {
    super(message);
    this.name = name;
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
