const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    data: {
      statusCode: 404,
      name: "Page Not Found",
      msg: "Page does not exist. Please recheck URL",
    },
  });
};

module.exports = notFound;
