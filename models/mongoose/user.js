const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
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
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    online: {
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

module.exports = model("User", UserSchema);
