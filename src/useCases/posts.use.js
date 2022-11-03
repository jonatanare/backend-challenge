import { Post } from '../models/posts.model.js'
import { Author } from '../models/authors.model.js'
import { Reaction } from '../models/reactions.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

function getAll () {
  return Post.find({})
}

async function create (newPost, userCurrent) {
  console.log({ ...newPost, author: userCurrent })
  const postCreated = await Post.create({ ...newPost, author: userCurrent })
  console.log(newPost, userCurrent)
  await Author.findByIdAndUpdate(userCurrent,
    { $push: { posts: postCreated._id } })

  return postCreated
}

async function update (idPost, unupdatedPost) {
  const postFinded = await Post.findById(idPost)
  if (!postFinded) throw new StatusHttp('Post not foundUSECASE!')
  return Post.findByIdAndUpdate(idPost, unupdatedPost, { new: true })
}

async function getById (idPost) {
  const postFinded = await Post.findById(idPost)
  if (!postFinded) throw new StatusHttp('Post not found', 400)
  return Post.findById(idPost)
}

async function deleteById (idPost) {
  const postFinded = await Post.findById(idPost)
  if (!postFinded) throw new StatusHttp('Post not found')
  return Post.findByIdAndDelete(idPost)
}

async function addReaction (postId, userCurrent) {
  console.log({ ...postId, author: userCurrent })
  const reactionCreated = await Reaction.create({author: userCurrent })
  await Post.findByIdAndUpdate(postId, {
    $push: { reactions: reactionCreated._id }
  })
  return reactionCreated
}

export {
  getAll,
  create,
  update,
  deleteById,
  getById,
  addReaction
}
