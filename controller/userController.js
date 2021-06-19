const User = require('../model/user')
const bcrypt = require('bcrypt')

const addNewUser = async ({ name, email, password }) => {
    if (!/.*@.*\..*/.test(email)) {
        return { status: false, message: 'Invaild email' }
    }
    if (!password) {
        return { status: false, result: "Password is required" }
    }
    let hash = await bcrypt.hash(password, 10)

    try {
        const user = new User({ name, email, password: hash })
        let newUser = await user.save()
        return { status: true, result: newUser }
    }
    catch (err) {
        return { status: false, result: 'Error' + err.message }
    }
}

const loginUser = async({name, password}) => {
    console.log('user controller login', name, password)
    try {
        let user = await User.findOne({name})
        console.log('found user', user)
        if ( user === null ) {
            return{status: false, result: {message : "User not found "}}
        }
        let vaildPassword = await bcrypt.compare(password, user.password)
        if (!vaildPassword) {
            return { status: false, result : {message: " Invalid password"}}
        }
        return {status: true, result: user}
    }
    catch (err) {
        return {status: false, result: "Login Error" + err.message }
    }
}

module.exports = {
    addNewUser,
    loginUser
}