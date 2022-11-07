import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
    trim: true
  },
  username: {
    type: String,
    required: false
  },
  biography: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500,
    trim: true
  },
  initialDate: {
    type: Date,
    required: true
  },
  nacionality: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  email: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  password: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]

})

const Author = mongoose.model('Author', authorSchema)
export { Author }
