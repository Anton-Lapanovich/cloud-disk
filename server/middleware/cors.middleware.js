// на сервере необходимо разрешить доступ к API с других доменов, middleware - промежуточное звено,
// которое позволит отправлять любые виды запросов с любых доменов
function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next(); // вызовет по цепочке следующий middleware
}

module.exports = cors
