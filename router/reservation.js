const { Router } = require("express");
const reservation = require("../controllers/reservation");
const { validarJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/registers", validarJWT, reservation.getAllReservation);
module.exports = router;
