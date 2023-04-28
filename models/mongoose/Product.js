const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

ProductSchema.plugin(mongoosePaginate);

module.exports = model("Product", ProductSchema);
