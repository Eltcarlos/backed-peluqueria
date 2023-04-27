const express = require("express");

const AuthRoute = require("./auth");
const ClientRoute = require("./client");
const ProductRoute = require("./product");

const RouterMain = express.Router();

RouterMain.use("/api/auth", AuthRoute);
RouterMain.use("/api/client", ClientRoute);
RouterMain.use("/api/product", ProductRoute);

module.exports = RouterMain;
