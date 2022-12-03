const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const User = require('../models/User')

// const initialBlogs = async () => {
//     const blogs = await Blog.find({})
//     return blogs.map(blog => blog.toJSON())
// }

const initialBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
    }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,blogsInDb,usersInDb
}