const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    mobilenumber: { type: String, required: false, trim: true },
    password: { type: String, required: true, trim: true },
    firstLogin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["Admin", "user"],
      required: false,
      default: "user",
    },
    loginstatus: { type: Boolean, default: false },
    Interest: { type: [], required: false, trim: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  this.uuid =
    "USER-" + crypto.pseudoRandomBytes(6).toString("hex").toUpperCase();
  console.log(this.uuid);
  next();
});

module.exports = mongoose.model("user", userSchema);
