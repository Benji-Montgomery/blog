const mongoose = require('mongoose')
console.log('twist')

// mongoose.connect(url)
//   .then(() => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message)
//   })

const blogSchema = new mongoose.Schema({
  username: {
    type: String
  },
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  title: {
    type: String,
  },
  content: { 
    type: String
   },
  likes: {
    type: Number
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

// const blogSchema = new mongoose.Schema({

//   name: {
//     type: String,
//     minlength: 3,
//     required: true
//   },
//   number: {
//     type: String,
//     minlength: 8,
//     validate: {
//       validator: function(v){
//         const monkey = /^\d{2,3}-\d{1,}$/
//         return monkey.test(v)
//       },
//       message: props => `${props.value} is not a valid finish phone number`
//     },
//     required: [true, 'User phone number required']
//   }
// })