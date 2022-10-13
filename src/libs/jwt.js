import jwt from 'jsonwebtoken'

const JWT_SECRET = 'ndkd7373fdk#%$#%'

function sign(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d'})
}

function verify(token) {
    return jwt.verify(token, JWT_SECRET)
}

export default {
    ...jwt,
    sign,
    verify
}