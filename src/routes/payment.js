const router = require('express').Router()
const stripe = require('stripe')
require("dotenv").config()

router.post('/', async(req, res)=>{
    try{
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "maessage": "Internal server error !",
            "status code": 500
        })
    }
})

module.exports = router

