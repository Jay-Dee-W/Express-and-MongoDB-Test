const User = require('../model/user')
const bcrypt = require('bcrypt')

const addNewUser = async({ name, email, password } ) => {
    if (!/.*@.*\..*/.test(email)) {
        return { status: false, message: 'Invaild email' }
    }
    if (!password) {
        return { status: false, result: "Password is required" }
    }
    let hash = await bcrypt.hash(password, 10)

    try {
        const user = new User({name, email, password:hash})
        let newUser = await user.save()
        return{status: true, result: newUser}
    }
    catch (err) {
        return {status: false, result : 'Error' + err.message}
    }
    }

module.exports = {
    addNewUser
}