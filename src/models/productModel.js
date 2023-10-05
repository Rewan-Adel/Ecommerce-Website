const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
      productId : {
        type  : mongoose.Schema.Types.ObjectId, ref : "Products", required : true
      },
      userId : {
        type  : mongoose.Schema.Types.ObjectId, ref: "users", required : true
      },
      rating : { type: Number, default: 0, required : true , minlength:0},
      comment: { type: String },
},
{
  timestamps: true,
});

const ProductSchema = new mongoose.Schema({
    name: { type: String, unique : true ,required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default : 0, minlength: 0 },
    image: { type: String, default: "https://res.cloudinary.com/dt6idcgyw/image/upload/v1692522045/Default_pfp.svg_wvwrib.png", required:true},
    reviews : [
      {type : mongoose.Schema.Types.ObjectId, ref : "reviews"}
    ]
  },
  {
    timestamps: true,
  }
);
const Product  = mongoose.model("Products", ProductSchema);
const Reviews  = mongoose.model('reviews', reviewSchema);

module.exports =  {
  Product, 
  Reviews
}               