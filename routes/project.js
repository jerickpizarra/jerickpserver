const express = require('express')
const router = express.Router()
const {create, read, update, delete_} = require('../controllers/project')

const {auth} = require('../middleware/auth')


// api/project
router.post('/', auth, create)
router.get('/', auth, read)
router.put('/:id', auth, update)
router.delete('/:id', auth, delete_)

module.exports = router