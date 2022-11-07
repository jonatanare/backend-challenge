import express from 'express'
import jwt_decode from 'jwt-decode'
import * as reactionsUseCase from '../useCases/reactions.use.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router()

// GET /reactions
router.get('/', auth, async (request, response, next) => {
  try {
    const allReactions = await reactionsUseCase.getAll()

    response.json({
      success: true,
      message: 'All reactions',
      data: {
        reactions: allReactions
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET /reactions by Id
router.get('/:id', auth, async (request, response, next) => {
  try {
    const { id } = request.params
    const getReaction = await reactionsUseCase.getById(id)
    response.json({
      succes: true,
      message: 'Reaction found',
      data: {
        reaction: getReaction
      }
    })
  } catch (error) {
    next(error)
  }
})

// Add reactions
router.patch('/:id', auth, async (request, response, next) => {
  try {
    const { userCurrent } = request
    const { id } = request.params

    const postLiked = await reactionsUseCase.addReaction(id, userCurrent)

    response.json({
      succes: true,
      message: 'Like!',
      data: {
        post: postLiked
      }
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /reactions
router.delete('/:id', auth, async (request, response, next) => {
  try {
    const { id } = request.params
    const { userCurrent } = request
    const reactionDeleted = await reactionsUseCase.deleteById(id, userCurrent)
    const success = reactionDeleted !== null && reactionDeleted !== undefined
    response.json({
      success,
      message: 'Reaction deleted'
    })
  } catch (error) {
    next(error)
  }
})

export default router
