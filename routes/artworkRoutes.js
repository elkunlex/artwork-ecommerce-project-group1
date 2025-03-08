// routes/artworkRoutes.js
const express = require("express");
const { createArtwork, getAllArtworks, updateArtwork, deleteArtwork } = require("../controllers/artworkController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createArtwork);
router.get("/", getAllArtworks);
router.put("/:id", protect, updateArtwork);
router.delete("/:id", protect, deleteArtwork);

module.exports = router;
