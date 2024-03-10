const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Task = require("../models/Task");
const { BadRequest, NotFound } = require("../errors");
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
  res.send("Update Me");
};

const updatePassword = async (req, res) => {
  res.send("Update Password");
};

const deleteMe = async (req, res) => {
  res.send("Delete Me");
};

module.exports = { getMe, updateMe, updatePassword, deleteMe };
