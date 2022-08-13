const mongoose = require('mongoose')

const experienceSchema = mongoose.Schema({
    startDate: Date,
    endDate: Date,
    title: String,
    description: String,
},{
    timestamps: true
})

module.exports = mongoose.model('experience', experienceSchema)