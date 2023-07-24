const multer = require('multer')
let upload = new multer({
        dest: "./img",
        limits: { fileSize: 7000000},
        fileFilter(req, file, cb){
            if(! file.originalname.endsWith('jpg') || file.originalname.endsWith('png') )
                return cb("only png or jpg  supported !")
        return cb(undefined, true)
}
})
module.exports = upload