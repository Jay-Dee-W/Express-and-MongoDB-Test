require('dotenv').config()
const mongoose = require('mongoose')

const db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/Address', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log(`database ${db.name} connected`)
    })
    .catch(e =>
        console.log('database error' + e.message)
    )

const express = require('express')
const app = express()

app.use(express.json())

const logger = require('./middleware/logger')
app.use(logger)


const userRouter = require('./route/user')
app.use('/user', userRouter)

const validate = require('./middleware/validate')


const addressRouter = require('./route/address')
app.use('/address', validate, addressRouter)



const PORT = 4000
app.listen(PORT, () =>{
    console.log('Server listening at http://localhost:'+ PORT)
})
