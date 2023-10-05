const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId : [{type: mongoose.Schema.Types.ObjectId, ref :"users",  required : true}],
    items  : [ {
      productId : { type: mongoose.Schema.Types.ObjectId, ref:'products', required : true},
      count     : { type: Number, default : 1},
      price     : { type: Number , required : true},
      name      : { type: String , required : true},
      image     : { type: String , required : true},
    }],   
    totalPrice : {type:Number, required: true},
    amount     : {type : Number, required: true}
},{
    timestamp : true
  }
);

module.exports = mongoose.model('carts', cartSchema);
