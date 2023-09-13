const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    productId : { type: mongoose.Schema.Types.ObjectId, ref:'products',  required: true},
    count     : { type: Number, default : 1,  required: true},
    price     : {type:Number,  required: true}
},{
    timestamp : true
  }
);

const cartSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref :"users", required : true},
    items  : [itemSchema],   
    cartTotal : {type:Number, required: true}
},{
    timestamp : true
  }
);

module.exports = mongoose.model('carts', cartSchema);
