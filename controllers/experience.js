const Experience = require('../models/experience')
const asyncHandler = require('express-async-handler')

//@Read All Experience - @GET /api/experience - @private
const read = asyncHandler(async (req,res) => {
    const experience = await Experience.find()
    res.status(200).json(experience)
})

//@Create Experience - @POST /api/experience - @private
const create = asyncHandler(async (req,res) => {
    const {
        startDate,
        endDate,
        title,
        description,
    } = req.body

    if (!title || !description){
        res.status(406)
        throw new Error("Fill Required Fields")
    }
    

    const experience = await Experience.create({
        startDate,
        endDate,
        title,
        description,
    })
    res.status(201).json(experience)
})

//@Update Experience - @PUT /api/experience/:id - @private
const update = asyncHandler(async (req,res) => {
    const experience = await Experience.findById(req.params.id)
 
    if(!experience){ 
        res.status(404)
        throw new Error("ID Not Found")
    }

    const { title, description } = req.body

    if (!title || !description){
        res.status(406)
        throw new Error("Fill Required Fields")
    }

    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updated)
})

//@Delete Experience - @DELETE /api/experience/:id - @private
const delete_ = asyncHandler(async (req,res) => {
    const experience = await Experience.findById(req.params.id)

    if (!experience){ 
        res.status(404)
        throw new Error("ID Not Found")
    }
    await experience.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    read,
    create,
    update,
    delete_,
}