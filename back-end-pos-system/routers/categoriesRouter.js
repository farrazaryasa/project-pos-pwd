const express = require('express')
const router = express.Router()

const { categoriesController } = require('./../controllers')

router.post('/new', categoriesController.createCategory)

module.exports = router
