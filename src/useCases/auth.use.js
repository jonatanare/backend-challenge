import { Author } from '../models/authors.model.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function login (email, password) {
  const authorFound = await Author.findOne({ email })
  if (!authorFound) throw new StatusHttp('invalid!')
  const isValidPassword = await bcrypt.compare(password, authorFound.password)
  if (!isValidPassword) throw new StatusHttp('try again!')
  return jwt.sign({ id: authorFound._id })
}

export {
  login
}

// auth login token
// token repetido
// populate meter caso de uso
// paginación -> no. de páginas
// anidar populate
// realizar un solo endpoint q muestre todo
