import mongoose from "mongoose"

const postSchema = new mongoose.Schema({ //recibirá un objeto
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
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
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] 
})

const Post = mongoose.model('Post', postSchema)
export {Post}



/* const commentSchema = new mongoose.Schema({
    text: String,
    username: String
})

const Comment = mongoose.model('comment', commentSchema)
export {Comment} */