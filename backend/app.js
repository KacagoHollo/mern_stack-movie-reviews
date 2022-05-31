const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use([logger]);

const userRoutes = require("./route/user");
app.use("/api/user", userRoutes);

const reviewRoutes = require("./route/review");
app.use("/api/review", reviewRoutes);

app.use(errorHandler);

module.exports = app;
