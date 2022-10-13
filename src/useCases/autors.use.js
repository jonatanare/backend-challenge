//acciones que el usuario podrá realizar 
import {Autors} from '../models/autors.model.js'
import bcrypt from '../libs/bcrypt.js'

function getAll(){
    return Autors.find({}) //regresa la promesa que utilizaré en los routers(presenters)
}


async function create(newAutor){
    // modificar
    const { email, password } = newAutor

    const autorFound = await Autors.findOne({email})

    if(autorFound) throw new Error('Ya existe un Autor con ese email')

    // Encriptar el password
    const encryptedPassword = await bcrypt.hash(password)

    return Autors.create({...newAutor, password: encryptedPassword})
}

function update(idAutor, unupdatedAutor){
    return Autor.findByIdAndUpdate(idAutor, unupdatedAutor)
}

function getById(idAutor){
    return s.findById(idAutor)
}

function deleteById(idAutor){
    return Autors.findByIdAndDelete(idAutor)
}


//export default le puedo cambair de nombre y con export asi como la exporto asi la tengo que llamar 


export {
    getAll,
    create,
    update,
    deleteById,
    getById
}