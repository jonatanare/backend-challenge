import { Comment } from "../models/comment.model.js";
import { Post } from "../models/posts.model.js";

// GET /comments
async function getAll() {
    return Comment.find({}).populate({path: 'author', select: ['name']})
}
// POST /cooments/
async function addComment(newComment, userCurrent) {
  console.log({ ...newComment, author: userCurrent });

  let commentCreated = await Comment.create({...newComment,author: userCurrent,
  });

  await Post.findByIdAndUpdate(newComment.post_id, {
    $push: { comments: commentCreated._id },
  });

  return commentCreated;
}

function deleteById(idComment) {
  return Comment.findByIdAndDelete(idComment);
}

function update(idComment, unupdatedComment) {
    return Comment.findByIdAndUpdate(idComment, unupdatedComment, { new: true })
}

export { getAll, addComment, deleteById, update };
