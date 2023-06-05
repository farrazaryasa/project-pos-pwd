const express = require('express')
const router = express.Router()

//import controllers
const {productsController} = require('./../controllers')

router.get('/', productsController.getAllProducts)
router.get('/:product_id', productsController.getProductDetails)

module.exports = router
