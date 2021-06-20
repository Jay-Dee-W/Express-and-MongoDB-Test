const jwt = require('jsonwebtoken')

const validateRequest = (req, res, next) => {
    let authHeader = req.headers['authorization'] 
    if ( !authHeader ) {
        res.status(403).send("Token not provided")
        return
    }
    let token = authHeader.split(" ")[1]
    console.log('validate decode', jwt.decode(token) )
   
    if (!token ) {
        res.status(403).send("Token not provided")
        return
    }
    try {
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) 
        next()
    } catch(err) {
        res.status(403).send("Invaild Token provided")
    }
}

module.exports = validateRequest