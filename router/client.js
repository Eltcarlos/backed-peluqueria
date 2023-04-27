const client = require("../controllers/client");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:id", client.getUser);
router.put("/password", validarJWT, client.changeUserPassword);
router.put("/personalDetails", validarJWT, client.changePersonalDetails);

module.exports = router;
