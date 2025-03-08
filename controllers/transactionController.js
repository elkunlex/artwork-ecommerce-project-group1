// controllers/transactionController.js
const Transaction = require("../models/Transaction");
const Artwork = require("../models/Artwork");
const Cart = require("../models/Cart");

const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const transactions = [];

    for (let artwork of cart.items) {
      if (artwork.status === "sold") {
        return res.status(400).json({ message: `Artwork "${artwork.title}" is already sold` });
      }

      const transaction = new Transaction({
        buyer: req.user.id,
        seller: artwork.seller,
        artwork: artwork._id,
        totalPrice: artwork.price,
      });

      transactions.push(transaction);
      artwork.status = "sold";
      await artwork.save();
    }

    await Transaction.insertMany(transactions);
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).json({ message: "Purchase successful", transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user.id }, { seller: req.user.id }],
    }).populate("artwork seller buyer");

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkout, getTransactionHistory };
