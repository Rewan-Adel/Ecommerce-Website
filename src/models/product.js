const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name        : {type: String, unique: true, required : true},
    category    : {type: String, required : true},
    description : {type: String, required : true},
    price       : {type: String, required : true},
    avatar      : {type: String }
},{
    timestamps : true
  }
)

module.exports = mongoose.model('Products', ProductSchema);