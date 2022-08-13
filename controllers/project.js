const Project = require('../models/project')
const asyncHandler = require('express-async-handler')

//@Read All Project - @GET /api/project - @private
const read = asyncHandler(async (req,res) => {
    const project = await Project.find()
    res.status(200).json(project)
})

//@Create Project - @POST /api/project - @private
const create = asyncHandler(async (req,res) => {
    const {
        title,
        description,
        stacks,
    } = req.body

    if (!title || !description || !stacks) {
        res.status(406)
        throw new Error("Fill Required Fields")
    }

    const project = await Project.create({
        title,
        description,
        stacks,
    })

    res.status(201).json(project)
})

//@Update Project - @PUT /api/project/:id - @private
const update = asyncHandler(async (req,res) => {
    const project = await Project.findById(req.params.id)
 
    if(!project){ 
        res.status(404)
        throw new Error("ID Not Found")
    }

    const { title, description } = req.body

    if (!title || !description) {
        res.status(406)
        throw new Error("Fill Required Fields")
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updated)
})

//@Delete Project - @DELETE /api/project/:id - @private
const delete_ = asyncHandler(async (req,res) => {
    const project = await Project.findById(req.params.id)

    if(!project){ 
        res.status(404)
        throw new Error("ID Not Found")
    }

    await project.remove()

    res.status(200).json({id: req.params.id})
})
    

module.exports = {
    read,
    create,
    update,
    delete_,
}