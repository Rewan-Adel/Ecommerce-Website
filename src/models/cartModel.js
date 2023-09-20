const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref :"users"},
    items  : [ {
      productId : { type: mongoose.Schema.Types.ObjectId, ref:'products'},
      count     : { type: Number, default : 1}
    }],   
    totalPrice : {type:Number}
},{
    timestamp : true
  }
);

module.exports = mongoose.model('carts', cartSchema);
