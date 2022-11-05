import { Post } from '../models/posts.model.js'
import { Author } from '../models/authors.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { Reaction } from '../models/reactions.model.js'


function getAll () {
  return Post.find({}).populate({
    path: 'reactions',
    populate: {
      path: "author", select: ['name']
    }
  })
}

async function create (newPost, userCurrent) {
  console.log({ ...newPost, author: userCurrent })
  const postCreated = await Post.create({ ...newPost, author: userCurrent })
  console.log(newPost, userCurrent)
  await Author.findByIdAndUpdate(userCurrent,
    { $push: { posts: postCreated._id } })

  return postCreated
}

async function update (idPost, unupdatedPost, updatedAt= Date.now()) {
  const postFound = await Post.findById(idPost)
  if (!postFound) throw new StatusHttp('Post not found!')
  const postUpdated =  Post.findByIdAndUpdate(idPost, {...unupdatedPost, updatedAt: updatedAt})
  return postUpdated
}

async function getById (idPost) {
  const postFound = await Post.findById(idPost)
  if (!postFound) throw new StatusHttp('Post not found', 400)
  return Post.findById(idPost)
}

async function deleteById (idPost) {
  const postFound = await Post.findById(idPost)
  if (!postFound) throw new StatusHttp('Post not found')
  return Post.findByIdAndDelete(idPost)
}



export {
  getAll,
  create,
  update,
  deleteById,
  getById,
}
