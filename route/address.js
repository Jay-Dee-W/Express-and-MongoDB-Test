const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()
const addressController = require('../controller/addressController')


router.get('/', async (req,res) =>{
    console.log('GET /address')
    let authHeader = req.headers['authorization']
    let token = authHeader.split(" ")[1]
    let user  = jwt.decode(token).name 
    let allAddress = await addressController.getAddress(user)

    res.status(200).send({allAddress})
})

router.post('/', async ( req, res) => {
    console.log('post /address', req.body, res.body)
    let authHeader = req.headers['authorization']
    let token = authHeader.split(" ")[1]
    let user  = jwt.decode(token).name 
    let newAddress = await addressController.addAddress(req.body, user)
    res.status(200).send({newAddress})
})

module.exports = router