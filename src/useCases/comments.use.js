import { StatusHttp } from '../libs/statusHttp.js'
import { Comment } from '../models/comment.model.js'
import { Post } from '../models/posts.model.js'

async function getAll () {
  return Comment.find({}).populate({ path: 'author', select: ['name'] })
}

async function addComment (newComment, userCurrent) {
  console.log({ ...newComment, author: userCurrent })
  const commentCreated = await Comment.create({ ...newComment, author: userCurrent })
  await Post.findByIdAndUpdate(newComment.post_id, {
    $push: { comments: commentCreated._id }
  })
  return commentCreated
}

async function deleteById (idComment) {
  const commentFound = await Comment.findById(idComment)
  if (!commentFound) throw new StatusHttp('Comment not found', 400)
  return Comment.findByIdAndDelete(idComment)
}

async function update (idComment, unupdatedComment) {
  const commentFound = await Comment.findById(idComment)
  if (!commentFound) throw new StatusHttp('Comment not found', 400)
  return Comment.findByIdAndUpdate(idComment, unupdatedComment, { new: true })
}

export {
  getAll,
  addComment,
  deleteById,
  update
}
