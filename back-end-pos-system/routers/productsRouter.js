const express = require('express')
const router = express.Router()

//import controllers
const { productsController } = require('./../controllers')
const { productMulter } = require('../middleware/productMulter')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProductDetails)
router.delete('/:id', verifyToken, productsController.deleteProducts)
router.post('/new', verifyToken, productMulter.single('image'), productsController.addProducts)
router.put('/:id', verifyToken, productMulter.single('image'), productsController.modifyProducts)

module.exports = router
