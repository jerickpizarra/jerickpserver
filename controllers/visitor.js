const Visitor = require('../models/visitor')
const asyncHandler = require('express-async-handler')

//@Create Visitor - @POST /api/visitor - @public
const create = asyncHandler(async (req, res) => {
    const { 
        deviceType,
        userAgent,
        os,
        os_version,
        browser_version,
        isDesktop,
        isTablet,
        isMobile,
        ip,
     } = req.body

    const visitor = await Visitor.create({
        deviceType,
        userAgent,
        os,
        os_version,
        browser_version,
        isDesktop,
        isTablet,
        isMobile,
        ip,
    })

    if(visitor)
        res.status(201).json({
            deviceType,
            userAgent,
            os,
            os_version,
            browser_version,
            isDesktop,
            isTablet,
            isMobile,
            ip,
        })
})


//@Get Visitor - @GET api/visitor - @private
const read = asyncHandler(async (req, res) => {
    const visitor = await Visitor.find()
    res.status(200).json(visitor)
})

module.exports = {
    create,
    read,
}