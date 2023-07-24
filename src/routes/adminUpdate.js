const express = require('express')
const router = express.Router()
const User = require("../models/user")
//const {verfiyAdminToken} = require("../verifyToken")

router.patch("/:id", async(req, res)=>{
    try{
        let user = await User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:true})
        if(!user){
            return res.status(400).json({'message': "user not found", "status code":400})
        }
        await user.save()
        return res.json({
            'message': `${user.fristName} ${user.lastName} is admin`,
            "fristNameme": user.fristNameme,
            "lastNameme": user.lastNameme,
            "email": user.email,
            "street": user.street,
            "city": user.city,
            "token":user.token,
            "adminRole":true,
            "id": user.id,})
    }
    catch(err){console.log(err)}
})

module.exports = router