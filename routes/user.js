const express = require('express')
const router = express.Router()
const {create, login, read} = require('../controllers/user')

const {auth} = require('../middleware/auth')


// api/user
router.post('/', create)
router.post('/login', login)
router.get('/me', auth, read)

module.exports = router