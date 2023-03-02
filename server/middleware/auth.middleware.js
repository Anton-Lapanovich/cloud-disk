// A middleware for user identification, importing jwt and config to obtain the secret key
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        // Will invoke the next middleware in the chain
        return next()
    }

    //  A token consists of two parts: the word "Bearer" and the token itself
    try {
        // To get the second element of an array
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        // To decode a token and retrieve all the data encoded in it
        const decoded = jwt.verify(token, config.get('secretKey'))
        // To add decoded data from a token
        req.user = decoded
        // will invoke the next middleware in the chain
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}