import mongoose from "mongoose"
import {Autor} from './autors.model.js'


const postSchema = new mongoose.Schema({ //recibirá un objeto
    autor: {
        type: String
    },
    title: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 500,
        trim: true 
    },
    createDate: {
        type: Date, 
        required: true
    },
    description: {
        type: String, 
        required: true,
    }
})

const Post = mongoose.model('Post', postSchema)
export {Post}
