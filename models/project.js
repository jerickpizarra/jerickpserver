const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    title: String,
    description: String,
    stacks: Array,
},{
    timestamps: true
})

module.exports = mongoose.model('project', projectSchema)