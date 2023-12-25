import  { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const patientSchema = new Schema({
   
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
    refreshToken:{
        type:String
    }
} , {timestamps:true});

//Taking help of Mongoose Hook (pre) to encrypt the password just before saving it into database using bcrpt

//Not used arrow function(middleware) so as to use 'this'

patientSchema.pre('save' , async function( next ){
    if(!this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password , 10);
    next();
})
patientSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}
patientSchema.methods.generateAccessToken  = function generateAccessToken() {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email ,
            username : this.username ,
            patientName : this.patientName
        },
        process.env.ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    );
}
patientSchema.methods.generateRefreshToken = function generateAccessToken() {
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
const Patient = model("Patient",patientSchema);
export default Patient;