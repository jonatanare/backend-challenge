import {Post} from '../models/posts.model.js'
import  { Author } from '../models/authors.model.js'


function getAll(){
    return Post.find({}).populate({path:'comments', select:['comment']})
    //return Post.find({}).populate('comments')
 }


async function create(newPost, userCurrent){
    let postCreated = await Post.create({...newPost, author: userCurrent})

    await Author.findByIdAndUpdate(newPost.author, {$push: {posts: postCreated._id}})

    return postCreated
}

function update(idPost, unupdatedPost){
    return Post.findByIdAndUpdate(idPost, unupdatedPost, {new:true})
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
    getById,
}