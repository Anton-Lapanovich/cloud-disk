/* On the server, it is necessary to allow access to the API from other domains,
Middleware is an intermediate layer that allows sending any types of requests from any domains */
function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // Will invoke the next middleware in the chain
    next();
}

module.exports = cors
