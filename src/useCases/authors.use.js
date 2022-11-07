// acciones que el usuario podrá realizar
import { Author } from '../models/authors.model.js'
import bcrypt from '../libs/bcrypt.js'
import { StatusHttp } from '../libs/statusHttp.js'

function getAll () {
  return Author.find({}).populate({
    path: 'posts',
    select: ['title']
  }) // regresa la promesa que utilizaré en los routers(presenters)
}

async function create (newAuthor) {
  const { email, password } = newAuthor
  const authorFound = await Author.findOne({ email })
  if (authorFound) {
    throw new StatusHttp('This author already exist!', 400)
  }
  const encryptedPassword = await bcrypt.hash(password)
  return await Author.create({ ...newAuthor, password: encryptedPassword })
}

async function update (idAuthor, unupdatedAuthor) {
  const authorFound = await Author.findById(idAuthor)
  if (!authorFound) {
    throw new StatusHttp('Author not found', 400)
  }
  return Author.findByIdAndUpdate(idAuthor, unupdatedAuthor, { new: true })
}

async function getById (idAuthor) {
  const authorFound = await Author.findById(idAuthor).populate({
    path: 'posts'
  })
  if (!authorFound) {
    throw new StatusHttp('Author not found', 400)
  }
  return Author.findById(authorFound).populate({
    path: 'posts',
    select: ['title']
  })
}

async function deleteById (idAuthor) {
  const authorFound = await Author.findById(idAuthor)
  if (!authorFound) {
    throw new StatusHttp('Author not found', 400)
  }
  return Author.findByIdAndDelete(idAuthor)
}

export { getAll, create, update, deleteById, getById }
