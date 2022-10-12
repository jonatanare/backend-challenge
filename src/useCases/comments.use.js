import { response } from "express";
import { PostComment } from "../models/postComment.model.js"
import { Post } from "../models/posts.model.js";
import * as postsUsesCases from "../useCases/posts.use.js";

function newComment(newComment){
    return PostComment.create(newComment)

    }

export {newComment}