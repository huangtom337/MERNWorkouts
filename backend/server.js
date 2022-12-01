const express = require('express')
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')


const app = express()

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch(err => {
        console.log(err)
    })


// middleware
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(express.json()) //any req that has body gets attached to req handler

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
