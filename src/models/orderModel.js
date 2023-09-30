const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , ref : "users", required : true },
    products: [
      {productId: { type: mongoose.Schema.Types.ObjectId , ref : "Products"}},
      {quantity : { type: Number, default: 1,  required : true}}
    ],
    amount: { type: Number, required: true },
    //address: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
   payment_status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// );



module.exports = mongoose.model("orders", orderSchema);
