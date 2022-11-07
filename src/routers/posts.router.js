import express from 'express'
import jwt_decode from 'jwt-decode'
import * as postsUsesCases from '../useCases/posts.use.js'
import * as reactionsUsesCases from '../useCases/reactions.use.js'
import { auth } from '../middlewares/auth.js'
import { accessOwnerPostsOrComments } from '../middlewares/ownerAccount.js'
const router = express.Router()

// GET /posts
router.get('/', async (request, response, next) => {
  try {
    const { page, limit } = request.query
    const skip = (page - 1) * 10
    const allPosts = await postsUsesCases.getAll().populate({ path: 'author', select: ['name'] }).skip(skip).limit(limit)

    response.json({
      succes: true,
      message: 'All posts',
      data: {
        posts: allPosts
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// get post with comments
router.get('/comments', async (request, response, next) => {
  try {
    const allPosts = await postsUsesCases.getAll().populate({ path: 'comments', select: ['comment'] })
    response.json({
      succes: true,
      message: 'All posts',
      data: {
        posts: allPosts
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET /posts /:id
router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const getPost = await postsUsesCases.getById(id)
    response.json({
      succes: true,
      message: 'Post found',
      data: {
        post: getPost
      }
    })
  } catch (error) {
    next(error)
  }
})

// CREATE /Posts
router.post('/', auth, async (request, response, next) => {
  try {
    const token = request.headers.authorization
    const post = request.body
    const { id } = jwt_decode(token)
    const postCreated = await postsUsesCases.create(post, id)
    response.json({
      success: true,
      message: 'New post created',
      data: {
        posts: postCreated
      }
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /posts
router.delete('/:id', auth, accessOwnerPostsOrComments, async (request, response, next) => {
  try {
    const { id } = request.params
    const postDeleted = await postsUsesCases.deleteById(id)
    response.json({
      succes: true,
      data: {
        post: postDeleted,
        message: 'Post deleted'
      }
    })
  } catch (error) {
    next(error)
  }
})

// EDIT /posts
router.patch('/:id', auth, async (request, response, next) => {
  try {
    const { id } = request.params
    const unUpdatePost = request.body
    const postUpdated = await postsUsesCases.update(id, unUpdatePost)

    response.json({
      succes: true,
      message: 'Post updated',
      data: {
        post: postUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})



export default router
