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

let logger = (req, res, next) => {
   req ?  console.log('Express Logger req', req.body ) : console.log('Express Logger res', res.body )
   next()
}
app.use(logger)

const authRouter = require('./route/auth')
app.use('/auth', authRouter)


app.get('/address', (req,res) =>{
    console.log('GET /address', req.body, res.body)
})

const PORT = 4000
app.listen(PORT, () =>{
    console.log('Server listening at http://localhost:'+ PORT)
})
