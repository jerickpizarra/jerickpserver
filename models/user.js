const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)