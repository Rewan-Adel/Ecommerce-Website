const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", ProductSchema);
