const { Sequelize } = require("sequelize");
const sequelize = require("../db/connect");
const bcrypt = require("bcryptjs");

const UserSchema = sequelize.define("User", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
  },
  confirmPassword: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      equals: {
        validator: (value) => value === this.password,
        message: "Passwords do not match",
      },
    },
  },
  noOfTasks: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
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

UserSchema.beforeSave(async (user, options) => {
  if (!user.changed("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  user.confirmPassword = null;
});

module.exports = UserSchema;
