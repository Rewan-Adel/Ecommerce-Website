const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
      product : {
        type  : mongoose.Schema.Types.ObjectId, ref : "products", required : true
      },
      user : {
        type  : mongoose.Schema.Types.ObjectId, required : true,  ref      : "users",
      },
      rating : { type: Number, default: 0, required : true },
      comment: { type: String },
},
{
  timestamps: true,
});

const ProductSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "users",
    // },
    name: { type: String, unique : true ,required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default : 0 },
    avatar: { type: String },
    reviews : {type : mongoose.Schema.Types.ObjectId}
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Products", ProductSchema);
const review  =  mongoose.model('Reviews', reviewSchema);

module.exports =  {
  Product, 
  review
}               