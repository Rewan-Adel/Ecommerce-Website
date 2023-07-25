const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
    name        : {type: String, unique: true, required : true},
    category    : {type: String, required : true},
    brand       : {type: String, required : true},
    description : {type: String, required : true},
    price       : {type: String, required : true},
    avatar      : {type: String },
    rating      :  {type:Number, defualt:0},
    comment     :  {type: String }, 
    countInStock: { type: Number, required: true, default: 0 },
},{
    timestamps : true
  }
)

module.exports = mongoose.model('Products', ProductSchema);
