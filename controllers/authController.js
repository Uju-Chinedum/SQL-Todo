const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { BadRequest, Unauthenticated, Unauthorized } = require("../errors");
const { addToBlacklist } = require("../middleware/blacklist");

const register = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequest("Invalid Password", "Passwords do not match");
  }

  const user = await User.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ data: { statusCode: StatusCodes.CREATED, user } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest(
      "Missing Details",
      "Please enter your email and password"
    );
  }

  const user = await User.findOne({ where: { email } });
  if (!user || user === null) {
    throw new Unauthenticated(
      "Invalid Credentials",
      `No user found with the email: ${email}`
    );
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.OK).json({
    data: {
      statusCode: StatusCodes.OK,
      user,
      message: "User logged in successfully",
      token,
    },
  });
};

const logout = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized(
      "Not Authorized",
      "User not authorized to perform this operation"
    );
  }

  const token = req.get("Authorization").replace("Bearer ", "");
  addToBlacklist(token);

  res.status(StatusCodes.OK).json({
    data: {
      statusCode: StatusCodes.OK,
      message: "User logged out successfully",
    },
  });
};

module.exports = { register, login, logout };
