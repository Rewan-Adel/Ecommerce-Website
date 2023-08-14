const jwt = require('jsonwebtoken')
require("dotenv").config()

const verifyAdminToken = async(req, res, nxt)=>{
    try{
        const token = await req.cookies.jwt
        const decodedpayload = await jwt.verify(token , process.env.JWT_SECRET)
        if(!decodedpayload.Role){
            return res.status(401).json({  
                "message": "Unauthorized!",
                "status code": 401
            })
        }
        nxt();
    }
    catch(err){
        console.log(err)
        res.status(400).json({ "message": 'Please authenticate.' })
    }
}

module.exports = verifyAdminToken