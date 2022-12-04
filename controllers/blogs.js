const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }


blogsRouter.get('/', (request, response) => {
  console.log(request.token)
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('micey')
  const token = (request.token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  if(body.title === undefined || body.name === undefined){
    response.status(400).end()
  }
  const likesScript = () => {
    if(body.likes === undefined){
      body.likes = 0
    }
  }
  likesScript(body)
  console.log(user)
  const blog = new Blog({
    user: user._id,
    username: user.username,
    name: body.name,
    title: body.title,
    content: body.content || false,
    likes: body.likes,
    date: new Date(),
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})
blogsRouter.delete('/:id', async (request, response) => {
  const token = (request.token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  let blog = await Blog.findById(request.params.id)
  console.log(blog)
  console.log(decodedToken)
  if(blog.username !== decodedToken.username){
    return response.status(401).json({ error: 'wrong username'})
}
  //if ( Blog.user.toString() === id.toString() ){
  //  console.log('poop')
  //}
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
// blogsRouter.delete('/:id', (request, response, next) => {
//   console.log('kittenees')
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    name: body.name,
    title: body.title,
    content: body.content,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter