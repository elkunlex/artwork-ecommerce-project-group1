//User
// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artwork" }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artwork" }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
