const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class BadRequest extends CustomError {
  constructor(name, message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = name;
  }
}

module.exports = BadRequest;
