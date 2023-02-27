// middleware is used for identification,  import jwt & config to obtain a secret key
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next() // call next middleware
    }

    try { //  token consists of two parts: bearer & token
        const token = req.headers.authorization.split(' ')[1] // get array second element
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        const decoded = jwt.verify(token, config.get('secretKey'))
        req.user = decoded // adding decoded data from the token
        next() // call next middleware
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}