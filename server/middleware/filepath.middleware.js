// to conveniently receive the path to the file storage
function filePath(path) {
    return function(req, res, next) {
        req.filePath = path
        next(); // will call the next middleware in the chain
    }
}


module.exports = filePath
