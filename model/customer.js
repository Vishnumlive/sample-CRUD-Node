const mongoose = require("mongoose");

const enumStatus = ['active', 'inactive', 'deleted'];

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    middleName: {
        type : String,
        required: false
    },
    
    lastName: {
        type : String,
        required : false
    },
    dateOfBirth : {
        type : Date,
        required : true,

    },
    status : {
        type : String,
        enum : enumStatus,
        default : 'active'
    },
    createdAt : {
        type : Date,
        default: Date.now
    },
    updatedAt : {
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Customers", CustomerSchema);