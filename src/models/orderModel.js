const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId , ref : "users", required : true },
    product: 
    [
      {
        productId: { type: mongoose.Schema.Types.ObjectId , ref : "Products", required : true},
        quantity : { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending"},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
