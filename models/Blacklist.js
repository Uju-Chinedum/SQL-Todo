const { Sequelize } = require("sequelize");
const sequelize = require("../db/connect");

const BlacklistSchema = sequelize.define("Blacklist", {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
});

module.exports = BlacklistSchema;
