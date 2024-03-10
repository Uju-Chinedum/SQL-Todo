const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Task = require("../models/Task");
const { BadRequest } = require("../errors");
const { checkPermissions } = require("../utils");

const getMe = async (req, res) => {
  res.send("Get Me");
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
