import { Author } from "../models/authors.model.js";
import bcrypt from "../libs/bcrypt.js";
import jwt from "../libs/jwt.js";

async function login(email, password) {

    const authorFound = await Author.findOne({email})

    if(!authorFound) throw new Error('Credenciales invalidad')

    const isValidPassword = await bcrypt.compare(password, authorFound.password)

    if(!isValidPassword) throw new Error('Credenciales invalidas')

    return jwt.sign({id: authorFound._id})
}

export {
    login
}