const validator = require("../util/authValidator")
module.exports = (req, res, nxt)=>{
    const valid = validator(req.body)
    if(!valid){
        res.status(403).json({
            "message": "Invalid Data",
            "status code": 403
            })
    }
    nxt()
}