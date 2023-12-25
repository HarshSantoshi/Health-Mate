
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
    ,
    doctorImage :{
        type : String
    } ,
    fees:{
        type :Number ,
        required : true , 
        default : 200
    }
},{timestamps:true})
const Doctor = mongoose.model("Doctor",doctorSchema);
module.exports = Doctor;