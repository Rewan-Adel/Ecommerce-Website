const mongoose = require('mongoose')
const validator = require('validator')
const config = require('config')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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
    street:  { type : String, required : true },
    city:  { type : String, required : true },
    isAdmin :   { type : Boolean, default: false },
},{
    timestamps : true
  }
)
userSchema.methods.AuthToken = function(res){
    let token = jwt.sign({ 
        userID    : this._id,
        adminRole : this.isAdmin
    }, process.env.JWTSEC, {expiresIn: '7d'})
    config('jwtsecvar')
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 60 * 60 * 1000
    })
    
    return token
}

module.exports = mongoose.model('users', userSchema)