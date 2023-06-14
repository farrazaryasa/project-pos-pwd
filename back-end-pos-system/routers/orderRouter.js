const express = require('express')
const router = express.Router()

const { orderController } = require('./../controllers')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/', verifyToken, orderController.getCart)
router.post('/confirm', verifyToken, orderController.userPaid)
router.post('/new', verifyToken, orderController.addCart)
router.delete('/:id', verifyToken, orderController.removeCart)

module.exports = router