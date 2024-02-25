const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class Unauthenticated extends CustomError {
  constructor(name, message) {
    super(message);
    this.name = name;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
