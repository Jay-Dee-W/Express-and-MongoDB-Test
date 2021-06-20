const Address = require('../model/address')
const User = require('../model/user')

const addAddress = async (address, user) => {
    // console.log('address controller add ', address, user )
    const currentUser = await User.findOne({ name : user }).exec()
   const currentUserid  = (currentUser._id )
   let newAddress = await new Address({...address, user: currentUserid}).save()
   return newAddress
}  

const getAddress = async(user) => {
    console.log('address controller get ', user )
    const currentUser = await User.findOne({ name : user }).exec()
    const currentUserid  = (currentUser._id )
    const allAddress =  await Address.find({ user : currentUserid})
    return allAddress
}

module.exports = {
    addAddress,
    getAddress
}