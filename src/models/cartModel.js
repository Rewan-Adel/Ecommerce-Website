const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, required : true},
    products : [
        {
        productId : { type: mongoose.Schema.Types.ObjectId, required : true},
        count : { type: Number, default : 1},
        price: Number
    },
],
    cartTotal : Number

},{
    timestamp : true
  }
)

module.exports = mongoose.model('carts', cartSchema);
