const express = require('express')
// const jwt = require('jsonwebtoken')

const router = express.Router()
const userController = require('../controller/userController')

router.post('/signup', async(req,res) => {
    let result = await userController.addNewUser(req.body)

    result.status ?  res.status(201).send( result.result) : res.status(400).send(result.result)
    
} )