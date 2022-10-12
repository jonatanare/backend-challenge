import mongoose from 'mongoose'


const PostCommentSchema = new mongoose.Schema({
    comment: String,
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

const PostComment = mongoose.model('PostComment', PostCommentSchema)
export {PostComment}