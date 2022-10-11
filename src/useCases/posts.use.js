import {Post} from '../models/posts.model.js'

function getAll(){
    return Post.find({})//regresa la promesa que utilizaré en los routers(presenters)
}


function create(newPost){
    return Post.create(newPost)
}

function update(idPost, unupdatedPost){
    return Post.findByIdAndUpdate(idPost, unupdatedPost)
}

function getById(idPost){
    return Post.findById(idPost)
}

function deleteById(idPost){
    return Post.findByIdAndDelete(idPost)
}


//export default le puedo cambair de nombre y con export asi como la exporto asi la tengo que llamar 


export {
    getAll,
    create,
    update,
    deleteById,
    getById
}