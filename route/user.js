const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()
const userController = require('../controller/userController')
const tokenController = require('../controller/token')

router.post('/signup', async (req, res) => {
    console.log('user signup router', req.body)
    let result = await userController.addNewUser(req.body)

    result.status ? res.status(201).send(result.result) : res.status(400).send(result.result)

})

router.post('/login', async (req, res) => {
    console.log('user login router', req.body)
    const loginResult = await userController.loginUser(req.body)
    if (loginResult.status) {
        let payload = {
            name: loginResult.result.name
        }
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
        console.log('access token', token)
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
        //add refreshToken to db
        tokenController.addToken(refreshToken)

        res.status(200).json({ 'access_token': token, 'refresh_token': refreshToken })
    } else {
        res.status(403).json(loginResult.result)
    }
})

router.get('/token', async (req, res) => {
    let token = req.body.token
    const validToken = await tokenController.getToken(token)
    
    if (validToken) {  
        const payload = {
            name : jwt.decode(validToken.token).name 
        }
        console.log('payload', payload )
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
        res.status(200).json({ 'access_token': token })
        // res.end()
    } else {
        res.status(403).send("Invalid refresh token")
    }

})

module.exports = router
