const express = require("express");
const router = require("./routes");
const validationErrorHandler = require("./errorsHandlers/validationError");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use("/api", router);

app.use(validationErrorHandler);

module.exports = app;
