const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async(req, res, nxt)=>{
    try{
        const token = await req.header('x-auth-token')
        if(!token){
            return res.status(400).json({
                "message": "jwt is not defiend",
                "status code": 400
            })
        }
        const decodedpayload = await jwt.verify(token , config.get('jwtsec'))
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
        res.status(401).json({ "message": 'Please authenticate.' })
    }
}