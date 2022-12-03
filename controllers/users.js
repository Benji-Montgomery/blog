const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    
    const existingUser = await User.findOne({ username})
    console.log(existingUser)
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }
    console.log(request.body)
    if(password.length < 3 ){
        return response.status(400).json({
            error: 'password less than 3 characters'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    if(user.username.length < 3 ){
        return response.status(400).json({
            error: 'username less than 3 characters'
        })
    }
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter