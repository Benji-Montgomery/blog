const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

// const initialBlogs = async () => {
//     const blogs = await Blog.find({})
//     return blogs.map(blog => blog.toJSON())
// }

const initialBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
    }
  

module.exports = {
    initialBlogs
}