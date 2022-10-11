//acciones que el usuario podrá realizar 
import {Autor} from '../models/autors.model.js'

function getAll(){
    return Autor.find({}) //regresa la promesa que utilizaré en los routers(presenters)
}


function create(newAutor){
    return Autor.create(newAutor)
}

function update(idAutor, unupdatedAutor){
    return Autor.findByIdAndUpdate(idAutor, unupdatedAutor)
}

function getById(idAutor){
    return Autor.findById(idAutor)
}

function deleteById(idAutor){
    return Autor.findByIdAndDelete(idAutor)
}


//export default le puedo cambair de nombre y con export asi como la exporto asi la tengo que llamar 


export {
    getAll,
    create,
    update,
    deleteById,
    getById
}