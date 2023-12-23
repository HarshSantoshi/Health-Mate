const mongoose= require('mongoose');
const patientSchema = new mongoose.Schema({
   
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
    patientName:{
        type:String,
        required: true,
    },
    // password to be asked at the time of registration
    password:{
        type:String,
        required: true
    },
    age:{
        type :Number
    }
})
const Patient = mongoose.model("patient",patientSchema);
module.exports = Patient;