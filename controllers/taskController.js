const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Task = require("../models/Task");
const { NotFound, BadRequest } = require("../errors");
const { checkPermissions } = require("../utils");

const selection = ["id", "task", "status", "startTime", "user", "updatedAt"];

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
      task: {
        id: task.id,
        task: task.task,
        status: task.status,
        startTime: task.startTime,
        user: task.user,
        updatedAt: task.updatedAt,
      },
    },
  });
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { user: req.user.userId }, attributes: selection });

  res.status(StatusCodes.OK).json({
    data: { statusCode: StatusCodes.OK, tasks, noOfTasks: tasks.length },
  });
};

const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({
    where: { id: taskId },
    attributes: selection,
  });
  if (!task) {
    throw new NotFound("Task not found", `No task found with ID: ${taskId}`);
  }

  checkPermissions(req.user, task.user);

  res.status(StatusCodes.OK).json({
    data: { statusCode: StatusCodes.OK, task },
  });
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({
    where: { id: taskId },
    attributes: selection,
  });
  if (!task) {
    throw new NotFound("Task not found", `No task found with ID: ${taskId}`);
  }

  const { task: name, status, startTime } = req.body;
  if (!name || !status || startTime === undefined) {
    throw new BadRequest("Missing Fields", "Please fill all fields");
  }

  checkPermissions(req.user, task.user);

  const updateData = { task: name, status, startTime };
  await task.update(updateData);
  await task.save();

  res.status(StatusCodes.OK).json({
    data: {
      statusCode: StatusCodes.OK,
      message: "Task updated successfully",
      task,
    },
  });
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findByPk(taskId);
  if (!task) {
    throw new NotFound("Task not found", `No task found with ID: ${taskId}`);
  }

  checkPermissions(req.user, task.user);

  const user = await User.findByPk(req.user.userId);

  await task.destroy();

  user.update({ noOfTasks: user.noOfTasks - 1 });
  await user.save();

  res.status(StatusCodes.OK).json({
    data: {
      statusCode: StatusCodes.OK,
      message: "Task deleted successfully",
    },
  });
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
