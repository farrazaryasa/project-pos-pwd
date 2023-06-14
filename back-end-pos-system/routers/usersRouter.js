const express = require('express')
const router = express.Router()

const { usersController } = require('./../controllers')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/', usersController.getAllUser)

module.exports = router