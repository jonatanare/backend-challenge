import express from 'express'
import * as authorsUsesCases from '../useCases/authors.use.js'
import { auth } from '../middlewares/auth.js'
import { accessOwnerAccount } from '../middlewares/ownerAccount.js'

const router = express.Router()

// GET /Authors
router.get('/', async (request, response, next) => {
  try {
    const { page, limit } = request.query
    const skip = (page - 1) * 10

    const allAuthors = await authorsUsesCases
      .getAll()
      .populate('posts')
      .skip(skip)
      .limit(limit)
    response.json({
      success: true,
      message: 'All authors',
      data: {
        authors: allAuthors
      }
    })
  } catch (error) {
    next(error)
  }
})

// PLUS endpoint
router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params

    const getAuthor = await authorsUsesCases.getById(id)

    response.json({
      success: true,
      message: 'Author',
      data: {
        author: getAuthor
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST /Authors
router.post('/', async (request, response, next) => {
  try {
    const { body: newAuthor } = request
    const authorCreated = await authorsUsesCases.create(newAuthor)

    response.json({
      success: true,
      message: 'Author created',
      data: authorCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /Authors
router.delete(
  '/:id',
  auth,
  accessOwnerAccount,
  async (request, response, next) => {
    try {
      const { id } = request.params
      const authorDeleted = await authorsUsesCases.deleteById(id)
      response.json({
        success: true,
        message: 'Author deleted'
      })
    } catch (error) {
      next(error)
    }
  }
)

// EDIT /Authors
router.patch(
  '/:id',
  auth,
  accessOwnerAccount,
  async (request, response, next) => {
    try {
      const { id } = request.params
      const unUpdateAuthor = request.body

      const authorUpdated = await authorsUsesCases.update(id, unUpdateAuthor)
      response.json({
        success: true,
        message: 'Author updated',
        data: {
          author: authorUpdated
        }
      })
    } catch (error) {
      next(error)
    }
  }
)

export default router
