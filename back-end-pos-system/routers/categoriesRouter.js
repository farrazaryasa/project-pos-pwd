const express = require('express')
const router = express.Router()

const { categoriesController } = require('./../controllers')

router.post('/new', categoriesController.createCategory)
router.get('/', categoriesController.getAllCategories)

module.exports = router
