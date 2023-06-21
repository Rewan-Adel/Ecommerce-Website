const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    //brand: {type: String, required : true},
    name : {type: String, unique: true, required : true},
    category : {type: String, required : true},
    description: {type: String, required : true},
    price : {type: String, required : true},
    //avatar : {type: Buffer },
    // created_at    : { type: Date },
    // updated_at    : { type: Date, default: Date.now }
},{
    timestamps : true
  }
)

module.exports = mongoose.model('Products', ProductSchema);