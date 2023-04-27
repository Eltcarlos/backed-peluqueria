const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: Number,
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
