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
    ,
    refreshToken:{
        type:String
    }
},{timestamps:true})
// to display doctors in pages with some limit
doctorSchema.plugin(mongooseAggregatePaginate);
doctorSchema.pre('save' , async function( next ){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password , 10);
    next();
})
doctorSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}
doctorSchema.methods.generateAccessToken  = function generateAccessToken() {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email ,
            username : this.username ,
            doctorName : this.doctorName
        },
        process.env.ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    );
}
doctorSchema.methods.generateRefreshToken = function generateAccessToken() {
    return jwt.sign(
        {
            _id : this._id, 
        },
        process.env.ACCESS_REFRESH_SECRET, 
        { 
            expiresIn: process.env.ACCESS_REFRESH_EXPIRY 
        }
    );
}
const Doctor = model("Doctor",doctorSchema);
export default Doctor;