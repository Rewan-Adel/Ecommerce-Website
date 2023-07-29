const multer = require('multer')

const upload = new multer({
    limits: {filesize :1000000},
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.jpg' || '.jpng' || '.png')){
           return cb(new Error("Please upload image"))
        }
        cb(undefined, true)
    }
})

module.exports = upload