const Usuario = require("../models/usuario");

const userConnect = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;
  await usuario.save();
  return usuario;
};

const userDisconnect = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;
  await usuario.save();
  return usuario;
};

const getUsers = async () => {
  const users = await Usuario.find().sort("-online");
  return users;
};

module.exports = {
  userConnect,
  userDisconnect,
  getUsers,
};
