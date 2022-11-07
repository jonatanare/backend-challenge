import { Reaction } from '../models/reactions.model.js'
import { Post } from '../models/posts.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function addReaction (postId, userCurrent) {
/*     const author = postAuthors
    const authorFound = await Author.findOne({ author })
    if (authorFound) throw new StatusHttp('You already like this post!', 400) */
  const reactionCreated = await Reaction.create({ ...postId, author: userCurrent })
  console.log('userCurrent', userCurrent)
  await Post.findByIdAndUpdate(postId, {
    $push: { reactions: reactionCreated._id }
  })
  return reactionCreated
}

async function getAll () {
  return Reaction.find({}).populate({ path: 'author', select: ['name'] })
}

async function getById (idReaction) {
  const reactionFound = await Reaction.findById(idReaction)
  if (!reactionFound) throw new StatusHttp('Post not found', 400)
  return Reaction.findById(idReaction).populate({ path: 'author', select: ['name'] })
}

async function deleteById (idReaction) {
  const reactionFound = await Reaction.findById(idReaction)
  if (!reactionFound) throw new StatusHttp('Reaction not found', 400)
  return Reaction.findByIdAndDelete(idReaction)
}

export {
  getAll,
  getById,
  addReaction,
  deleteById
}
