import mongoose from "mongoose"
import {Autor} from '../models/autors.model.js'

const postSchema = new mongoose.Schema({ //recibirá un objeto
    autor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true 
    },
    title: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 500,
        trim: true 
    },
    description: {
        type: String, 
        required: true,
    },
    /* comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] */
})

const Post = mongoose.model('posts', postSchema)
export {Post}



/* const commentSchema = new mongoose.Schema({
    text: String,
    username: String
})

const Comment = mongoose.model('comment', commentSchema)
export {Comment} */