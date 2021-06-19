const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    city:{
        type: String
    }, 
    pincode: {
        type: Number
    }, 
    state: {
        type: String
    }, 
    country: {
        type: String
    }, 
    addressLine1: {
        type: String
    }, 
    addressLine2: {
        type: String
    }, 
    label: {
        type: String
    }
})

const AddressModel = new mongoose.model('Address' , AddressSchema)
module.exports = AddressModel