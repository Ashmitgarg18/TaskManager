const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
require('dotenv').config()
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorhandler') 

app.use(express.static('./public'))
app.use(express.json())

// app.get('/hello', (req, res)=>{
//     res.send('Task Manager App')
// })

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`The server is listening on ${port}...`))
    } 
    catch (error) {
        console.log(error);
    }
}

start()


