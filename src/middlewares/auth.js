import jwt from '../libs/jwt.js'

function auth(request, response, next) {
    try {
        const {authorization: token } = request.headers

        const isValidToken = jwt.verify(token)
        if(!isValidToken) throw new Error('No autorizado')

        next()
    } catch (error) {
        response.status(401)
        response.json({
            success: false,
            message: 'No autorixado :(',
            error: error.message
        })
    }
}

export { auth }