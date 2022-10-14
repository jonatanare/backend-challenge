import mongoose from "mongoose"

const postSchema = new mongoose.Schema({ 
    image: {
        type: String,
        default: "http://placeimg.com/806/338/tech",
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: false
    },

    updatedAt: {
        type: Date,
        default: Date.now()
           
    },
    title: {
        type: String, 
        required: false,
        minLength: 3,
        maxLength: 500,
        trim: true 
    },
    hashtags:{
        type:String,
        required:false, 
        minLength: 3,
        maxLength: 500,
        trim: true

    },

    description: {
        type: String, 
        required: false,
        minLength: 5,
        trim: true
    },
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] ,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
})


const Post = mongoose.model('Post', postSchema)
export {Post}


