const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class Unauthorized extends CustomError {
  constructor(name, message) {
    super(message);
    this.name = name;
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
