const jwt = require("jsonwebtoken");
const User = require("../models/mongoose/user");
const asyncHandler = require("express-async-handler");

const validarJWT = asyncHandler(async (req, res, next) => {
  let token;
  // check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // set token from Bearer token in header
    try {
      token = req.headers.authorization.split(" ")[1];
      // verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      // get user id from decoded token
      req.user = await User.findById(decoded.uid).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  // if token doesnt exist in headers send error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = {
  validarJWT,
  admin,
};
