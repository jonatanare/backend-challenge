import express from 'express'
import jwt_decode from 'jwt-decode'
import * as commentUseCase from '../useCases/comments.use.js'
import { auth } from '../middlewares/auth.js'
import { accessOwnerPostsOrComments } from '../middlewares/ownerAccount.js'
const router = express.Router()

// GET /comments
router.get('/', async (request, response, next) => {
  try {
    const allComments = await commentUseCase.getAll()

    response.json({
      success: true,
      message: 'All comments',
      data: {
        comments: allComments
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET /comments by Id
router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const getComment = await commentUseCase.getById(id)
    response.json({
      success: true,
      message: 'Post found',
      data: {
        post: getComment
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST /comments
router.post('/', auth, async (request, response, next) => {
  try {
    const { body: comment } = request
    const token = request.headers.authorization
    const { id } = jwt_decode(token)
    console.log(id)
    const newComment = await commentUseCase.addComment(comment, id)

    console.log(newComment)
    response.json({
      success: true,
      message: 'Comment published',
      data: newComment
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// DELETE /comments
router.delete('/:id', auth, accessOwnerPostsOrComments, async (request, response, next) => {
  try {
    const { id } = request.params
    const commentDeleted = await commentUseCase.deleteById(id)
    response.json({
      success: true,
      message: 'Comment deleted',
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// EDIT /comments
router.patch('/:id', auth, accessOwnerPostsOrComments, async (request, response, next) => {
  try {
    const { id } = request.params
    const unupdateComment = request.body
    const commentUpdated = await commentUseCase.update(id, unupdateComment)

    response.json({
      success: true,
      message: 'Comment updated',
      data: {
        comment: commentUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})
export default router
