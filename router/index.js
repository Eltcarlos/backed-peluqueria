const express = require("express");

const AuthRoute = require("./auth");

const RouterMain = express.Router();

RouterMain.use("/api/auth", AuthRoute);

module.exports = RouterMain;
