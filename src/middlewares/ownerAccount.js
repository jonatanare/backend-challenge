
import { Post } from '../models/posts.model.js'
import { Comment } from '../models/comment.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

function accessOwnerAccount (request, response, next) {
  try {
    const { userCurrent } = request /* token decoded */

    const idUser = request.params.id /* se cambia de nombre a rutas idCompany a id URL */

    if (userCurrent !== idUser) throw new Error('You can only edit your own Account')

    next()
  } catch (error) {
    response.status(403)
    response.json({
      success: false,
      message: error.message
    })
  }
}

async function accessOwnerPostsOrComments (request, response, next) {
  try {
    const { userCurrent } = request /* id de user current */

    const id = request.params.id /* se cambia de nombre a rutas idCompany a id */
    if (!id) throw new StatusHttp('Id not found!')
    const postOrCommentId = await Post.findById(id) || await Comment.findById(id)
    if (!postOrCommentId) throw new StatusHttp('Request not found!')
    const idUser = postOrCommentId.author._id.valueOf()

    if (userCurrent !== idUser) throw new Error('You can only edit your own Account')

    next()
  } catch (error) {
    response.status(403)
    response.json({
      success: false,
      message: error.message
    })
  }
}

export {
  accessOwnerAccount,
  accessOwnerPostsOrComments
}
