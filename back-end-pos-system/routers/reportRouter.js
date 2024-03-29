const express = require('express')
const router = express.Router()

const { reportController } = require('./../controllers')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/chart', reportController.chartData)
router.get('/sales', reportController.productSales)

module.exports = router