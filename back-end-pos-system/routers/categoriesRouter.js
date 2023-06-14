const express = require('express')
const router = express.Router()

const { categoriesController } = require('./../controllers')

router.post('/', categoriesController.createCategory)
router.get('/', categoriesController.getAllCategories)
router.delete('/:id', categoriesController.deleteCategory)

module.exports = router
