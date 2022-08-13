const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

//Generate JWT 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

//@Register User - @POST /api/user - @public
const create = asyncHandler(async (req, res) => {
    const {name, username, password} = req.body

    //check if all text field has value
    if(!name || !username || !password){
        res.status(406)
        throw new Error("Fill Required Fields")
    }

    //check if user already exists
    const userExists = await User.findOne({username})
    if(userExists){
        res.status(409)
        throw new Error("User Already Exists")
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        username,
        password: hashPassword
    })

    if(user)
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            token: generateToken(user.id)
        })
})

//@Authenticate user - @POST /api/user/login - @public
const login = asyncHandler(async (req, res) => {
    const {name, username, password} = req.body
    const user = await User.findOne({username})


    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            username: user.username,
            token: generateToken(user.id)
        })
    }else{
        res.status(406)
        throw new Error("Invalid Credentials")
    }
})


//@Get User - @GET api/user/me - @private
const read = asyncHandler(async (req, res) => {
    const {_id, name, username} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        username,
    })
})

module.exports = {
    create,
    login,
    read,
}