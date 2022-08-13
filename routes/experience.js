const express = require('express')
const router = express.Router()
const {create, read, update, delete_} = require('../controllers/experience')

const {auth} = require('../middleware/auth')


// api/experience
router.post('/', auth, create)
router.get('/', auth, read)
router.put('/:id', auth, update)
router.delete('/:id', auth, delete_)

module.exports = router