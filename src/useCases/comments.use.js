import { PostComment } from "../models/postComment.model.js"
import { Post } from "../models/posts.model.js";

async function addComment(newComment){
    let{comment} = newComment

    let acomment = await PostComment.create(newComment)

    return acomment

    }

    
export {
        addComment
    }