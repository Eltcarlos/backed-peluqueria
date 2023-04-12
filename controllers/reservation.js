const Reservation = require("../models/reservation");

const getAllReservation = async (req, res) => {
  try {
    const register = await Reservation.find();
    return res.json({
      ok: true,
      data: register,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk with admin",
    });
  }
};

module.exports = {
  getAllReservation,
};
