const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { BadRequest, Unauthenticated } = require("../errors");
const { where } = require("sequelize");

const register = async (req, res) => {
  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ data: { user } });
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

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.OK).json({ data: { user, token } });
};

const logout = async (req, res) => {
  res.send("Logout");
};

module.exports = { register, login, logout };
