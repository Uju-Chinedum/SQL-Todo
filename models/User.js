const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { BadRequest } = require("../errors");

const UserSchema = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
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
    allowNull: true,
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

//UserSchema.beforeCreate(async (user) => {
  //user.id = uuidv4();
//});

UserSchema.beforeSave(async (user, options) => {
  if (!user.changed("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  user.confirmPassword = null;
});

UserSchema.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = UserSchema;
