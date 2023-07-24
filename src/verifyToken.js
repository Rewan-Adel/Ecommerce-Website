const jwt = require('jsonwebtoken')
require("dotenv").config()

const verfiyAdminToken = async(req, res, nxt)=>{
    try{
        const token = await req.cookies.jwt
        const decodedpayload = await jwt.verify(token , process.env.JWTSEC)
        if(!decodedpayload.adminRole){
            return res.status(401).json({  
                "message": "Unauthorized!",
                "status code": 401
            })
        }
        nxt()
    }
    catch(err){
        console.log(err)
        res.status(400).json({ "message": 'Please authenticate.' })
    }
}

module.exports = verfiyAdminToken