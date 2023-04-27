const User = require("../models/mongoose/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationEmail = await User.findOne({ email });
    if (validationEmail) {
      return res.status(400).json({
        ok: false,
        user: {},
        msg: "the email is already exists",
        Token: "",
      });
    }
    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generateJWT(user.id);
    res.json({
      ok: true,
      msg: "complete",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk with admin",
      user: {},
      token: "",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserDB = await User.findOne({ email });
    console.log(UserDB);
    if (!UserDB) {
      return res.json({
        ok: false,
        user: {},
        msg: "Error",
        token: "",
      });
    }
    const validPassword = bcrypt.compareSync(password, UserDB.password);
    if (!validPassword) {
      return res.json({
        ok: false,
        user: {},
        msg: "Error",
        token: "",
      });
    }
    const token = await generateJWT(UserDB.id);
    res.json({
      ok: true,
      user: UserDB,
      msg: "complete",
      token,
    });
  } catch (error) {
    res.json({
      ok: false,
      user: {},
      msg: "Talk with admin",
      token: "",
    });
  }
};

const revalidateToken = async (req, res) => {
  const uid = req.uid;

  const token = await generateJWT(uid);
  const User = await User.findById(uid);

  res.json({
    ok: true,
    User,
    token,
  });
};

module.exports = {
  register,
  login,
  revalidateToken,
};
