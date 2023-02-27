const express = require ("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const app = express() // server creation from express
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware') // механизм безопасности, который позволяет ресурсу с одного домена обращаться на другой

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json()) // по умолчанию express не может распарсить json-строку, это необходимо указать явно
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)
const start = async () => { // connection to the database is an async process
    try {
        mongoose.connect(config.get("dbUrl"))
        app.listen(PORT, () => { // running a server
            console.log('Server started on port', PORT)
        })
    } catch (e) {

    }
}

start()
