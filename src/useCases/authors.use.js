//acciones que el usuario podrá realizar 
import {Author} from '../models/authors.model.js'

function getAll(){
    return Author.find({}) //regresa la promesa que utilizaré en los routers(presenters)
}


function create(newAuthor){
    return Author.create(newASuthor)
}

function update(idAuthor, unupdatedAuthor){
    return Author.findByIdAndUpdate(idAuthor, unupdatedAuthor)
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