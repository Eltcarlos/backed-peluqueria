const { Schema, model } = require("mongoose");

const RegisterSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    method: {
      type: Number,
      required: true,
    },
    worker: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    coin: {
      type: String,
      default: "EUR",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("cash", RegisterSchema);
