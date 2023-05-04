const User = require("../models/mongoose/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { sendTransaction, generateToken } = require("../utils/epayco");
const Transaction = require("../models/mongoose/Transaction");

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

const createTransaction = asyncHandler(async (req, res) => {
  try {
    const { productsCart, ...rest } = req.body;
    await generateToken();
    const resp = await sendTransaction(rest);
    if (!resp) {
      return res.status(400).json({
        ok: false,
        data: resp.data,
      });
    }

    console.log(resp);
    const { data } = resp;

    const dataTransaction = {
      userId: req.user._id,
      status: data.transaction.status,
      ref_payco: data.transaction.data.ref_payco,
      invoice: data.transaction.data.factura,
      price: data.transaction.data.valor,
      iva: data.transaction.data.iva,
      ico: data.transaction.data.ico,
      paymentReceipt: data.transaction.data.recibo,
      dateTransaction: data.transaction.data.fecha,
      typeCard: data.transaction.data.franquicia,
      typeDoc: data.transaction.data.tipo_doc,
      document: data.transaction.data.documento,
      products: productsCart,
      address: {
        country: rest.country,
        city: rest.city,
        location: rest.location,
        address: rest.address,
        phoneNumber: rest.phoneNumber,
      },
    };
    console.log("test2");

    const transaction = new Transaction(dataTransaction);
    await transaction.save();
    console.log("test3");
    res.json({
      ok: true,
      data: resp,
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
  createTransaction,
};
