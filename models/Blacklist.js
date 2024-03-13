const { Sequelize } = require("sequelize");
const sequelize = require("../db/connect");

const BlacklistSchema = sequelize.define("Blacklist", {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = BlacklistSchema;
