const mongoose = require('mongoose')

const visitorSchema = mongoose.Schema({
    deviceType: String,
    userAgent: String,
    os: String,
    os_version: String,
    browser_version: String,
    isDesktop: Boolean,
    isTablet: Boolean,
    isMobile: Boolean,
    ip: String,
},{
    timestamps: true
})

module.exports = mongoose.model('visitor', visitorSchema)