
import jwt from '../libs/jwt.js'

function auth (request, response, next) {
  try {
    const { authorization: token } = request.headers

    const tokenDecoded = jwt.verify(token)

    if (!tokenDecoded) throw new Error('No autorizado D:')
    request.userCurrent = tokenDecoded.id
    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'No autorizado u.u',
      error: error.message
    })
  }
}

export { auth }
