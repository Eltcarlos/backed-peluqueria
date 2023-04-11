const { Router } = require("express");
const cashRegister = require("../controllers/cashRegister");
const { validarJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/newRegister", validarJWT, cashRegister.newRegister);
router.get("/registers", validarJWT, cashRegister.getAllRegister);

module.exports = router;
