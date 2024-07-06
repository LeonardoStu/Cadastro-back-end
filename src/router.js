const express = require('express')
const userController = require('../controllers/usersController')
const checkToken = require('../controllers/auth/authController')

const router = express.Router()

router.post('/register', userController.create)
router.post('/login', userController.login)
router.get('/show', userController.getAll)
router.get('/profile/:id', checkToken, userController.getFindId)
router.delete('/profile/:id', checkToken, userController.deleteUser)
router.put('/profile/:id', checkToken, userController.updatedUser)

module.exports = router