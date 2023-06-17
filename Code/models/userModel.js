const mongoose = require('mongoose')
const validator = require('validator')
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fristName    : { type : String , required : true},
    lastName    : { type : String , required : true},
    email   :  { 
        type : String,
        unique : true,
        trim: true,
        required : true
    },
    password:  { type : String, minlength: 4, maxlength: 255, required : true },
    isAdmin :   { type : Boolean, default: false }

})
userSchema.methods.AuthToken = function(){
    const token = jwt.sign({
        userID : this._id,
        adminRole : this.isAdmin
}, config.get('jwtsec'))
    return token
}

module.exports = mongoose.model('users', userSchema)