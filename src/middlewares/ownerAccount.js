
import { Post } from '../models/posts.model.js'
import { StatusHttp } from '../libs/statusHttp.js'


function accessOwnerAccount (request, response, next) {
  try {
    const { userCurrent } = request /* token decoded */

    const idUser = request.params.id /* se cambia de nombre a rutas idCompany a id URL */
    console.log('id del usuario logeado', userCurrent)
    console.log('id del usuario a editar ', idUser)

    if (userCurrent !== idUser) throw new Error('You can only edit your own Account')

    next()
  } catch (error) {
    console.log(error)
    response.status(403)
    response.json({
      success: false,
      message: error.message
    })
  }
}

async function accessOwnerPosts(request, response, next) {
  try {
    const { userCurrent } = request /* id de user current */

    const idPost = request.params.id /* se cambia de nombre a rutas idCompany a id */
    if (!idPost) throw new StatusHttp('Post not found 1MIDDL!')
    const postFinded = await Post.findById(idPost)
    if (!postFinded) throw new StatusHttp('Post not found 2 MIDDL!')
    const idUser = postFinded.author._id.valueOf()
    console.log('id del usuario logeado(token)', userCurrent)
    console.log('id del usuario a editar ', idUser)

    if (userCurrent !== idUser) throw new Error('You can only edit your own Account')

    next()
  } catch (error) {
    console.log(error)
    response.status(403)
    response.json({
      success: false,
      message: error.message
    })
  }
}


export { 
  accessOwnerAccount,
  accessOwnerPosts
 }
