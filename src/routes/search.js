const router  = require('express').Router()
const controller = require('../controllers/search')

router.get("/name?/:key", controller.srchByName)
router.get("/brand?/:key", controller.srchByBrand)
router.get("/category?/:key", controller.srchByCategory)
router.get("/price?/:key", controller.srchByPrice)
router.get("/rating?/:key", controller.srchByRating)

module.exports = router