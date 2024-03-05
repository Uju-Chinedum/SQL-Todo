const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const User = require("./user");
const { v4: uuidv4 } = require("uuid");

const TaskSchema = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
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
    type: DataTypes.UUID,
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
