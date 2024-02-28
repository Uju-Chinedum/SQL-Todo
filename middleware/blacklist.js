const Blacklist = require("../models/Blacklist");

const addToBlacklist = async (token) => {
  await Blacklist.create({ token });
};

const isTokenBlacklisted = async (token) => {
  const blacklistToken = await Blacklist.findOne({ where: { token } });
  return !!blacklistToken;
};

module.exports = {
  addToBlacklist,
  isTokenBlacklisted,
};
