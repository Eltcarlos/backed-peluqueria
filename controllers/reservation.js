const Reservation = require("../models/reservation");

const newReservation = async (req, res) => {
  try {
    const register = new Reservation(req.body);
    await register.save();
    res.json({
      ok: true,
      register,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk with admin",
    });
  }
};

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

const getReservationByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const register = await Reservation.findByIdAndUpdate(id, { status });
    if (!register) {
      return res.json({
        ok: false,
      });
    }
    await register.save();
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
  newReservation,
  getAllReservation,
  getReservationByID,
};
