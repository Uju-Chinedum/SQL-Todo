const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Task = require("../models/Task");
const { BadRequest, NotFound, Unauthenticated } = require("../errors");
const { checkPermissions } = require("../utils");

const getMe = async (req, res) => {
  const { id: userId } = req.params;

  const me = await User.findByPk(userId);
  if (!me) {
    throw new NotFound("User Not Found", `No user with ID: ${userId}`);
  }

  checkPermissions(req.user, userId);

  res.status(StatusCodes.OK).json({
    data: { statusCode: StatusCodes.OK, user: me },
  });
};

const updateMe = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound("User not found", `No user found with ID: ${userId}`);
  }

  const { fullName, email } = req.body;
  if (!fullName || !email) {
    throw new BadRequest("Missing Fields", "Please fill all fields");
  }

  checkPermissions(req.user, userId);

  const updateData = { fullName, email };
  await user.update(updateData);
  await user.save();

  res.status(StatusCodes.OK).json({
    data: {
      statusCode: StatusCodes.OK,
      message: "User updated successfully",
      user,
    },
  });
};

const updatePassword = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound("User not found", `No user found with ID: ${userId}`);
  }

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequest("Missing Details", "Please fill all fields");
  }

  const isPassword = await user.comparePassword(oldPassword);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  checkPermissions(req.user, userId);

  const updateData = { password: newPassword };
  await user.update(updateData);
  await user.save();

  res.status(StatusCodes.OK).json({
    data: {
      statusCode: StatusCodes.OK,
      message: "Password updated successfully",
      user,
    },
  });
};

const deleteMe = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound("User not found", `No user found with ID: ${userId}`);
  }

  // Delete all tasks associated with user
  await Task.destroy({ where: { user: userId } });
  // Delete user
  await user.destroy();

  res.status(StatusCodes.OK).json({
    data: {
      statusCode: StatusCodes.OK,
      message: "User deleted successfully",
    },
  });
};

module.exports = { getMe, updateMe, updatePassword, deleteMe };
