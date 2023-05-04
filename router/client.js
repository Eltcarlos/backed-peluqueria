const client = require("../controllers/client");
const { Router } = require("express");
const { validarJWT, admin } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:id", client.getUser);
router.get("/", client.getClients);
router.get("/directions/:id", client.getDirections);
router.post("/transaction", client.createTransaction);
router.put("/directions/remove", validarJWT, client.removeDirections);
router.put("/newDirection", validarJWT, client.createDirection);
router.put("/password", validarJWT, client.changeUserPassword);
router.put("/personalDetails", validarJWT, client.changePersonalDetails);
module.exports = router;
