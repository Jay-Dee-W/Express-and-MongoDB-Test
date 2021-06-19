const Token = require('../model/token')


const addToken = async (token) => {
    const newToken = new Token({ token })
    await newToken.save() }

const getToken = async (token) => {
    console.log("token",token)
    let refeshToken = await Token.findOne({token : token})
    console.log("refresh token", refeshToken )
    return refeshToken
}


module.exports = {
    addToken,
    getToken
}