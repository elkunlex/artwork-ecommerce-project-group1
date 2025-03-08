// controllers/artworkController.js
const Artwork = require("../models/Artwork");

const createArtwork = async (req, res) => {
  const { title, description, price, imageUrl, category } = req.body;

  try {
    const artwork = await Artwork.create({
      title,
      description,
      price,
      imageUrl,
      category,
      seller: req.user.id,
    });

    res.status(201).json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ status: "available" });
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArtwork = async (req, res) => {
  const { title, description, price, imageUrl, category } = req.body;

  try {
    let artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    if (artwork.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { title, description, price, imageUrl, category },
      { new: true }
    );

    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    if (artwork.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await artwork.remove();
    res.json({ message: "Artwork deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createArtwork, getAllArtworks, updateArtwork, deleteArtwork };
