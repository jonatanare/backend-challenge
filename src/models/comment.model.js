import mongoose from 'mongoose'


const PostCommentSchema = new mongoose.Schema({
    comment: {
        type:String
    },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
    },

});

const PostComment = mongoose.model('PostComment', PostCommentSchema)
export {PostComment}