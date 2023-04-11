const { Router } = require("express");
const reservation = require("../controllers/reservation");
const { validarJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/newRegister", reservation.newReservation);
router.get("/registers", validarJWT, reservation.getAllReservation);
router.post("/register/:id", validarJWT, reservation.getReservationByID);
module.exports = router;
