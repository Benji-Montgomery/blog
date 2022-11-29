const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path: ', request.path)
//   console.log('Body: ', request.body)
//   console.log('---')
//   next()
// }

// app.use(express.json())

// app.use(requestLogger)

// app.use(cors())

// app.use(express.static('build'))

// app.get('/', (req, res) => {
//   res.send('<h1>Hello Worlt!</h1>')
// })

// app.post('/api/blogs', (request, response, next) =>{
//   const body = request.body
//   const blog = new Blog({
//     name: body.name,
//     number: body.number
//   })

//   blog.save()
//     .then(savedBlog => {
//       response.json(savedBlog)
//     })
//     .catch(error => next(error))

// })


// app.get('/api/blogs', (request, response) => {
//   Blog.find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.delete('/api/blogs/:id', (request, response, next) => {
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// app.get('/api/blogs/:id', (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => {
//       next(error)
//     })
// })

// app.put('/api/blogs/:id', (request, response, next) => {
//   const { number, important } = request.body

//   Blog.findByIdAndUpdate(request.params.id, 
//     { number, important},
//     { new: true, context: 'query' })
//     .then(updatedBlog => {
//       response.json(updatedBlog)
//     })
//     .catch(error => next(error))
// })

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }


// app.use(errorHandler)

// server.listen(config.PORT, () => {
//     logger.info(`Server running on port ${config.PORT}`)
//   })