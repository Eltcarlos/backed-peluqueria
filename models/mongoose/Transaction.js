const { Schema, model } = require("mongoose");

const TransactionSchema = Schema(
  {
    userId: String,
    status: Boolean,
    ref_payco: Number,
    invoice: String,
    price: Number,
    iva: Number,
    ico: Number,
    paymentReceipt: String,
    dateTransaction: String,
    typeCard: String,
    typeDoc: String,
    document: Number,
    products: Array,
    address: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Transaction", TransactionSchema);
