import { Comment } from "../models/comment.model.js"
import { Post } from "../models/posts.model.js";
/* 
{
    comment: 'Hola este s i comenta',
    post_id: ''
} */
// POST /cooments/
async function addComment(newComment, userCurrent = '634386c6d813421c767eb39b'){
    console.log({...newComment, author: userCurrent});
    let commentCreated = await Comment.create({...newComment, author: userCurrent})
    await Post.findByIdAndUpdate(newComment.post_id, {$push:{comments:commentCreated._id}})
    return commentCreated

    }

    
export {
        addComment
    }