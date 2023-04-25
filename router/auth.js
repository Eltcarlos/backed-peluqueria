const auth = require("../controllers/auth");
const { Router } = require("express");
const { check } = require("express-validator");
const { Validator } = require("../middlewares/checkValidator");
const { validarJWT } = require("../middlewares/validate-jwt");

const router = Router();
router.post(
  "/register",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    Validator,
  ],
  auth.register
);
router.post(
  "/login",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    Validator,
  ],
  auth.login
);
router.get("/renew", validarJWT, auth.revalidateToken);

module.exports = router;
