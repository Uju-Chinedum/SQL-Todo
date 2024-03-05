const express = require("express");
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/").post(createTask).get(getAllTasks);
router
  .route("/:taskId")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
