const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
    console.log('GET /address', req.body, res.body)
    res.end()
})

module.exports = router