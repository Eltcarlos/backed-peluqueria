const User = require("../models/mongoose/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getClients = asyncHandler(async (req, res) => {
  try {
    const clients = await User.find({ role: "user" }).select("-password");
    res.status(200).json(clients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, confirmPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(confirmPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({
        ok: true,
        msg: "Password changed",
      });
    } else {
      res.json({ ok: false, msg: "Something happened wrong " });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const changePersonalDetails = asyncHandler(async (req, res) => {
  const { name, phoneNumber } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      name,
      phoneNumber,
    });
    await user.save();
    res.json({
      ok: true,
      msg: "Personal details changed",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const createDirection = asyncHandler(async (req, res) => {
  const address = req.body;
  try {
    const { addresses } = await User.findById(req.user._id);
    const newDirections = [...addresses, address];
    console.log(newDirections);
    const user = await User.findByIdAndUpdate(req.user._id, {
      addresses: newDirections,
    });
    console.log(user);
    await user.save();
    res.json({
      ok: true,
      msg: "Direccion agregada",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const getDirections = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const removeDirections = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const { addresses } = await User.findById(req.user._id);
    const newDirections = addresses.filter((index) => index.id !== id);
    const user = await User.findByIdAndUpdate(req.user._id, {
      addresses: newDirections,
    });
    await user.save();
    res.json({
      ok: true,
      msg: "Direccion removida",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getUser,
  changeUserPassword,
  changePersonalDetails,
  getClients,
  createDirection,
  getDirections,
  removeDirections,
};
