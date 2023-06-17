const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const auth = require("../middlewares/authorization")
const { findByIdAndUpdate } = require('../models/userModel')
router.patch("/:id", auth, async(req, res)=>{
    try{
        let user = await findByIdAndUpdate({_id: req.params.id, adminRole:true})
        if(!user){
            return res.status(400).json({'message': "user not found", "status code":400})
        }
        return res.json({
            'message': `${user.fristName} ${user.lastName} is admin`,
            "fristNameme": user.fristNameme,
            "lastNameme": user.lastNameme,
            "email": user.email,
            "token":user.token,
            "adminRole": user.isAdmin,
            "id": user.id,})
    }
    catch(err){console.log(err)}
})

module.exports = router