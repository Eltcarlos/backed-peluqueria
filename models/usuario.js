const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notification: [
      {
        type: Schema.Types.ObjectId,
        ref: "notifications",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Usuario", UsuarioSchema);
