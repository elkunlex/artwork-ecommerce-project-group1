// routes/transactionRoutes.js
const express = require("express");
const { checkout, getTransactionHistory } = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/checkout", protect, checkout);
router.get("/", protect, getTransactionHistory);

module.exports = router;
