const Product = require("../models/mongoose/Product");

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    const product = await Product.find({ name: { $regex: name, $options: "i" } });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getProductByName,
};
