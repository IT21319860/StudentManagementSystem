require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const studentRoutes = require ('./routes/student')

//express app
const app = express()

//middlewear
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/users',userRoutes)
app.use('/api/student',studentRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=> {
            console.log('Connected to DB & Listening on port:', process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })

















