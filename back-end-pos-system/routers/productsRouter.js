const express = require('express')
const router = express.Router()

//import controllers
const { productsController } = require('./../controllers')
const { productMulter } = require('../middleware/productMulter')

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProductDetails)
router.delete('/:id', productsController.deleteProducts)
router.post('/new', productMulter.single('image'), productsController.addProducts)

module.exports = router
