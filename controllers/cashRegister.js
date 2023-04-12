const Register = require("../models/register");

const getAllRegister = async (req, res) => {
  try {
    const register = await Register.find().sort({ createdAt: -1 });
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
  getAllRegister,
};
