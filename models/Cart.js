//CARTMODEL
// models/Cart.js
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artwork" }]
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
