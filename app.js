require("dotenv").config();
require("express-async-errors");
const express = require("express");

const sequelize = require("./db/connect");
const notFound = require("./middleware/notFound");

const app = express();
const port = 5000 || process.env.PORT;

app.use(notFound);

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

start();
