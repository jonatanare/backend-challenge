import {Post} from '../models/posts.model.js'
import  { Author } from '../models/authors.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

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
    const { title } = unupdatedPost

    console.log('TITLE: ',title);
    console.log('ID: ', idPost);

    const postFinded = Post.findById(idPost)

    console.log('POST ENCONTRADO: ', postFinded);

    if(!postFinded) throw StatusHttp('Post not found!')

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