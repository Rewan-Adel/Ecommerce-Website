const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId , ref : "Products", required : true},
    quantity : { type: Number, default: 1,  required : true},
},{
  timestamps: true,
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , ref : "users", required : true },
    product: [productSchema],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// const orderSchema = new mongoose.Schema({
//   cartId: { type: mongoose.Schema.Types.ObjectId , ref : "carts", required : true },
//   paymentWay : { type:String, enum:["Credit card", "PayPal", "Value", "Vodafone Cash"] },
//   address : { type: Object, required: true },
//   status  : { type: String, default: "pending", enum: ["processing", "delivered", "canceled"] },
//   },
//   {
//     timestamps: true,
//   }
// );



module.exports = mongoose.model("order", orderSchema);
