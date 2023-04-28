const Product = require("../models/mongoose/Product");

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const getAllProductsPagination = async (req, res) => {
  try {
    const { page = 1, pageSize = 7, sort = null } = req.query;
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const product = await Product.paginate({}, { limit: pageSize, page, sort: sortFormatted });
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
    const product = await Product.find({
      $or: [{ name: { $regex: name, $options: "i" } }, { category: { $regex: name, $options: "i" } }],
    });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getProductByName,
  getAllProductsPagination,
};
