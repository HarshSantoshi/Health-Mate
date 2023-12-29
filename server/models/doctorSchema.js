import  { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const doctorSchema = new Schema({
    // ask specialization at the time of registration
    specialization: {
        type: String,
        required: true,
        minLength: 3
    }
    ,
    // unique email to be asked for at time of registration
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
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
    }
    ,
    phoneNo :{
        type : Number
    }
    ,
    doctorImage :{
        type : String
    } 
    ,
    fees:{
        type :Number ,
        required : true , 
        default : 200
    }
    
},{timestamps:true})

const Doctor = model("Doctor",doctorSchema);
export default Doctor;