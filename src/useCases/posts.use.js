import {Post} from '../models/posts.model.js'
import  { Author } from '../models/authors.model.js'

function getAll(){
    return Post.find({}).populate({path:'comments', select:['comment']})
    //return Post.find({}).populate('comments')
 }


async function create(newPost, userCurrent){
    console.log({ ...newPost, author: userCurrent });
    let postCreated = await Post.create({...newPost, author: userCurrent,
    })
console.log(newPost,userCurrent);
    await Author.findByIdAndUpdate(userCurrent,
        {$push: {posts: postCreated._id},
    })

    return postCreated;
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



export {
    getAll,
    create,
    update,
    deleteById,
    getById,
}