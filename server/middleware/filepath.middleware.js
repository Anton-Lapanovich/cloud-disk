// To conveniently receive the path to the file storage
function filePath(path) {
    return function(req, res, next) {
        req.filePath = path
        // Will invoke the next middleware in the chain
        next();
    }
}


module.exports = filePath
