import  { Schema, model } from 'mongoose';

const patientSchema = new Schema({
   
    // unique email to be asked for at time of registration
    email: {
        type: String,
        required: true,
        unique: true
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
    dateofBirth:{
        type :Date
    }
    ,
    phoneNo :{
        type : Number
    },
    gender : {
        type:String ,
        enum : ["M" , "F" , "O"]
    }
    ,
    //will be stored in cloud
    patientImage:{
        type : String
    }
    ,
    bloodGroup:{
        type:String ,
    }, 
    disease:{
        type : String ,
    }
} , {timestamps:true});

const Patient = model("Patient",patientSchema);
export default Patient;