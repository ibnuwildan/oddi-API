const express = require('express')
const { userController } = require('../controller')
const router = express.Router()
const { auth } = require('../helper/auth')

router.get('/getAllUsers', userController.getUsers)
router.post('/Login', userController.login)
router.post('/register', userController.register)
router.post('/KeepLogin', auth, userController.KeepLogin)

module.exports = router