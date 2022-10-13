import { Autors } from "../models/autors.model.js";
import bcrypt from "../libs/bcrypt.js";
import jwt from "../libs/jwt.js";

async function login(email, password) {

    const autorFound = await Autors.findOne({email})

    if(!autorFound) throw new Error('Credenciales invalidad')

    const isValidPassword = await bcrypt.compare(password, autorFound.password)

    if(!isValidPassword) throw new Error('Credenciales invalidas')

    return jwt.sign({id: autorFound._id})
}

export {
    login
}