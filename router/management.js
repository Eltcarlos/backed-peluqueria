const { Router } = require("express");
const management = require("../controllers/management");
const { validarJWT, admin } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/admins", validarJWT, admin, management);

module.exports = router;
