const express = require('express')
const router = express.Router()
const {create, read} = require('../controllers/visitor')

const {auth} = require('../middleware/auth')


// api/visitor
router.post('/', create)
router.get('/', auth, read)

module.exports = router