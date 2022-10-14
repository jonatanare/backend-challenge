import {Post} from '../models/posts.model.js'
import  { Author } from '../models/authors.model.js'
import { StatusHttp } from '../libs/statusHttp.js'



function getAll(){
    return Post.find({}).populate({path:'comments', select:['comment']})
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


async function update(idPost, unupdatedPost){
    const postFinded = await Post.findById(idPost)
    if(!postFinded) throw new StatusHttp('Post not found!')

    return Post.findByIdAndUpdate(idPost, unupdatedPost, {new:true})
}


async function getById(idPost){
    const postFinded = await Post.findById(idPost)
    if(!postFinded) throw new StatusHttp('Post not found', 400)
    return Post.findById(idPost)
}


async function deleteById(idPost){
    const postFinded = await Post.findById(idPost)
    if(!postFinded) throw new StatusHttp('Post not found')
    return Post.findByIdAndDelete(idPost)
}



export {
    getAll,
    create,
    update,
    deleteById,
    getById,
}