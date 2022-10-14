import jwt from '../libs/jwt.js'
import { StatusHttp } from '../libs/statusHttp.js'

function auth(request, response, next) {
    try {
        const {authorization: token } = request.headers

        const isValidToken = jwt.verify(token)
        if(!isValidToken) throw new StatusHttp('No autorizado')

        next()
    } catch (error) {
        response.status(401)
        response.json({
            success: false,
            message: 'Log in or create your count',
            error: error.message
        })
    }
}

export { auth }