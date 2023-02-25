const express = require ("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const app = express() // server creation from express
const PORT = config.get('serverPort')

app.use(express.json()) // по умолчанию express не может распарсить json-строку, это необходимо указать явно
app.use("/api/auth", authRouter)
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
