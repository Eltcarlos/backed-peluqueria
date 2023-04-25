const { Schema, model } = require("mongoose");

const TransactionSchema = Schema(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Transaction", TransactionSchema);
