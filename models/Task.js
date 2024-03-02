const { Sequelize } = require("sequelize");
const sequelize = require("../db/connect");

const TaskSchema = sequelize.define("Task", {
  task: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("Finished", "Put Off", "Pending"),
    allowNull: false,
    defaultValue: "Pending",
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  user: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    index: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = TaskSchema;
