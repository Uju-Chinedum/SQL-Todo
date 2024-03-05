const { StatusCodes } = require("http-status-codes");
const Task = require("../models/Task");
const { BadRequest, Unauthenticated } = require("../errors");

const createTask = async (req, res) => {
  req.body.user = req.user.userId;

  const task = await Task.create(req.body);

  res.status(StatusCodes.CREATED).json({ data: { task } });
};

const getAllTasks = async (req, res) => {
  res.send("Get All Tasks");
};

const getSingleTask = async (req, res) => {
  res.send("Get Single Task");
};

const updateTask = async (req, res) => {
  res.send("Update Task");
};

const deleteTask = async (req, res) => {
  res.send("Delete Task");
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
