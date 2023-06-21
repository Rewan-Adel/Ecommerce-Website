const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId : {type: String, unique: true, required : true},
    products : [
        {
        prodectId : { type: String, required : true},
        quantity : { type: Number, default : 1},
    }
]},{
    timestemp : true
  }
)

module.exports = mongoose.model('cart', cartSchema);
