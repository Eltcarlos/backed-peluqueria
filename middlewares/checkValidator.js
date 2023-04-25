const { validationResult } = require("express-validator");

const Validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      ok: false,
      User: {},
      msg: errors.mapped(),
      token: "",
    });
  }
  next();
};

module.exports = {
  Validator,
};
