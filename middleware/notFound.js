const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    data: {
      statusCode: 404,
      name: "Page Not Found",
      message: "Page does not exist. Please recheck URL",
    },
  });
};

module.exports = notFound;
