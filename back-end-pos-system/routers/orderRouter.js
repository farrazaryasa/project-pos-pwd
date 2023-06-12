const express = require('express')
const router = express.Router()

const { orderController } = require('./../controllers')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/', verifyToken, orderController.getCart)
router.post('/new', verifyToken, orderController.addCart)
router.delete('/decrease', verifyToken, orderController.decreaseProductCart)
router.post('/pay', verifyToken, orderController.userPaid)
router.delete('/:id', verifyToken, orderController.removeCart)

module.exports = router