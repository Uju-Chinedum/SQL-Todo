require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const sequelize = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/authRoutes");

const app = express();
const port = 5000 || process.env.PORT;

app.use(helmet());
app.use(xss());
app.use(cors());

app.options("*", cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
