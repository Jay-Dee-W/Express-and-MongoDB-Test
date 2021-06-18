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
   req ?  console.log('Express Logger req', req.method, req.path ) : console.log('Express Logger res', res.body )
   next()
}
app.use(logger)

const userRouter = require('./route/user')
app.use('/user', userRouter)

const validateRequest = (req, res, next) => {
    console.log('validate')
    let authHeader = req.headers['authorization'] 
    if ( !authHeader ) {
        console.log('validate no auth header',   )
        res.status(403).send("Token not provided")
        return
    }
    let token =authHeader.split(" ")[1]
    if (!token ) {
        res.status(403).send("Token not provided")
        return
    }
    try {
        let data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        console.log(data)
        next()
    } catch(err) {
        res.status(403).send("Invaild Token provided")
        
    }
}

app.get('/address', validateRequest, (req,res) =>{
    console.log('GET /address', req.body, res.body)
    res.end()
})

const PORT = 4000
app.listen(PORT, () =>{
    console.log('Server listening at http://localhost:'+ PORT)
})
