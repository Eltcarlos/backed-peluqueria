const Register = require("../models/register");
const Reservation = require("../models/reservation");

const getCash = async () => {
  const register = await Register.find().sort({ createdAt: -1 });
  return register;
};

const sendCashRegister = async (payload) => {
  try {
    const register = new Register(payload);
    await register.save();
    return register;
  } catch (error) {
    return false;
  }
};

const getReservations = async () => {
  try {
    const reservation = await Reservation.find().sort({ createdAt: -1 });
    return reservation;
  } catch (error) {
    return false;
  }
};

const sendReservation = async (payload) => {
  try {
    const reservation = new Reservation(payload);
    await reservation.save();
    return reservation;
  } catch (error) {
    return false;
  }
};

const sendReservationByID = async ({ id, date }) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(id, { status: date });
    await reservation.save();
    return reservation;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getCash,
  sendCashRegister,
  getReservations,
  sendReservation,
  sendReservationByID,
};
