const express = require('express')
const userController = require('../controllers/usersController')

const router = express.Router()

router.post('/register', userController.create)
router.post('/login', userController.login)
router.get('/show', userController.getAll)
router.get('/profile/:id', userController.getFindId)
router.delete('/profile/:id', userController.deleteUser)
router.put('/profile/:id', userController.updatedUser)

module.exports = router