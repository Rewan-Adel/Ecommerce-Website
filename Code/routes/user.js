const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const validator = require('../middlewares/userMW')
const auth = require('../middlewares/authorization')

router.post("/",validator, controller.addNew)
router.get("/", auth, controller.getAll)
router.get("/:id", controller.getOne)
router.patch("/:id",validator,controller.updateOne)
router.delete("/:id",controller.DeleteOne)
router.get("/stats", auth, controller.stats)

module.exports = router