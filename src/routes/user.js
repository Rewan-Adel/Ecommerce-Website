const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const regValidator = require('../middlewares/userMW')
const authValidator = require('../middlewares/authMW')
const verfiyAdminToken = require('../verifyToken')

router.post("/register", regValidator, controller.register)
router.post("/auth", authValidator, controller.auth)
router.post("/logout",controller.logout)

router.get("/search/:key",  verfiyAdminToken, controller.search)
router.get("/", verfiyAdminToken,  controller.getAll)
router.get("/:id",   controller.getOne)
router.patch("/:id", controller.updateOne)
router.delete("/signOut/:id",controller.DeleteOne)

module.exports = router
