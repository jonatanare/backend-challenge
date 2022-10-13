//acciones que el usuario podrá realizar 
import {Author} from '../models/authors.model.js'
import bcrypt from '../libs/bcrypt.js'

function getAll(){
    return Author.find({}) //regresa la promesa que utilizaré en los routers(presenters)
}


async function create(newAuthor){
    // modificar
    const { email, password } = newAuthor

    const authorFound = await Author.findOne({email})

    if(authorFound) throw new Error('Ya existe un Author con ese email')

    // Encriptar el password
    const encryptedPassword = await bcrypt.hash(password)

    return Author.create({...newAuthor, password: encryptedPassword})
}

function update(idAuthor, unupdatedAuthor){
    return Author.findByIdAndUpdate(idAuthor, unupdatedAuthor, {new:true})
}

function getById(idAuthor){
    return Author.findById(idAuthor)
}

function deleteById(idAuthor){
    return Author.findByIdAndDelete(idAuthor)
}


//export default le puedo cambair de nombre y con export asi como la exporto asi la tengo que llamar 


export {
    getAll,
    create,
    update,
    deleteById,
    getById
}