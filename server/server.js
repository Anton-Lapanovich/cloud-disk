const express = require ("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const server = express()
const PORT = process.env.PORT || config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path')

server.use(fileUpload({}))
server.use(corsMiddleware)
server.use(filePathMiddleware(path.resolve(__dirname, 'files')))
// By default, Express cannot parse a JSON string. This needs to be specified explicitly
server.use(express.json())
server.use(express.static('static'))
server.use("/api/auth", authRouter)
server.use("/api/files", fileRouter)
const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        server.listen(PORT, () => {
            console.log('Server started on port', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()