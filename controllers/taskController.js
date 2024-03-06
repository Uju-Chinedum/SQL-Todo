const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Task = require("../models/Task");
const { NotFound, BadRequest, Unauthenticated } = require("../errors");

const createTask = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound("User not found", `No user found with ID: ${userId}`);
  }

  req.body.user = userId;
  const task = await Task.create(req.body);

  user.update({ noOfTasks: user.noOfTasks + 1 });
  await user.save();

  res.status(StatusCodes.CREATED).json({
    data: {
      statusCode: StatusCodes.CREATED,
      message: "Task created successfully",
      task,
    },
  });
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { user: req.user.userId } });

  res.status(StatusCodes.OK).json({
    data: { statusCode: StatusCodes.OK, tasks, noOfTasks: tasks.length },
  });
};

const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findByPk(taskId);
  if (!task) {  
    throw new NotFound("Task not found", `No task found with ID: ${taskId}`);
  }

  res.status(StatusCodes.OK).json({
    data: { statusCode: StatusCodes.OK, task },
  });
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
