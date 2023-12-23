const { Phone } = require('@mui/icons-material');
const mongoose= require('mongoose');
const doctorSchema = new mongoose.Schema({
    // ask specialization at the time of registration
    specialization: {
        type: String,
        required: true,
        minLength: 3
    },
    // unique email to be asked for at time of registration
    email: {
        type: String,
        required: true,
        unique: true
    },
    // unique username to be aksed for at the time of registration 
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    doctorName:{
        type:String,
        required: true,
    },
    // password to be asked at the time of registration
    password:{
        type:String,
        required: true
    }
    ,
    experienceYrs:{
        type : Number 
    }
    ,
    education:{
        type : String
    },
    phoneNo :{
        type : Number
    }

})
const Doctor = mongoose.model("doctor",doctorSchema);
module.exports = Doctor;