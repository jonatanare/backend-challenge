import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    comment: {
        type:String
    },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
    },

});

const Comment = mongoose.model('Comment', commentSchema)
export {Comment}