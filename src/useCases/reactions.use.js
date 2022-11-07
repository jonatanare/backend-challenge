import { Reaction } from '../models/reactions.model.js'
import { Post } from '../models/posts.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function addReaction (postId, userCurrent) {
  const postFound = await Post.findById(postId).populate('reactions')
  if (postFound == undefined) {
    throw new StatusHttp('Post not found!', 400)
  }
  const reactionFound = postFound.reactions.find(reaction => reaction.author.valueOf() === userCurrent)

  if (reactionFound) {
    throw new StatusHttp('You already like this post!', 400)
  }
  const reactionCreated = await Reaction.create({ ...postId, author: userCurrent })
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
  if (!reactionFound) {
    throw new StatusHttp('Post not found', 400)
  }
  return Reaction.findById(idReaction).populate({ path: 'author', select: ['name'] })
}

async function deleteById (idReaction, userCurrent) {
  console.log(idReaction)
  const reactionFound = await Reaction.findById(idReaction)
  if (!reactionFound) {
    throw new StatusHttp('Reaction not found', 400)
  }
  if(reactionFound.author.valueOf() !== userCurrent){
    throw new StatusHttp('You cannot delete another reaction', 400)
  }
  return Reaction.findByIdAndDelete(idReaction)
}

export {
  getAll,
  getById,
  addReaction,
  deleteById
}
