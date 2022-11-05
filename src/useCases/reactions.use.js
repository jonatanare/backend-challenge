import { Reaction } from '../models/reactions.model.js'
import { Post } from '../models/posts.model.js'

async function addReaction (postId, userCurrent) {
    console.log({ ...postId, author: userCurrent })
    const reactionCreated = await Reaction.create({author: userCurrent })
    await Post.findByIdAndUpdate(postId, {
      $push: { reactions: reactionCreated._id }
    })
    return reactionCreated
  }