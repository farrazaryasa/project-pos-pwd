const express = require('express')
const router = express.Router()

//import controllers
const {productsController} = require('./../controllers')

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProductDetails)
router.delete('/:id', productsController.deleteProducts)

module.exports = router
