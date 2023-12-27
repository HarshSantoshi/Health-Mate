import { asyncHandler } from "../utils/asyncHandler.js";
import{ ApiError} from "../utils/ApiError.js"
import Doctor from "../models/doctorSchema.js";
import {ApiResponse} from "../utils/ApiResponse.js"
const registerDoctor = asyncHandler( async(req, res) =>{
    //steps to be followed :
    //get user details from the frontend
    //validate the details
    //check if user already exists by email
    //create user object 
    //remove password and refresh token from response
    //check for user creation
    //return response

    //destructing the request
    const {doctorName , email , password , specialization} = req.body;
    console.log(email);
    //validations
    if(doctorName == ""){
        throw new ApiError(400 , "Doctor Name is Required")
    }
    if(email == ""){
        throw new ApiError(400 , "Email is Required")
    }
    if(password == ""){
        throw new ApiError(400 , "Password is Required")
    }
    if(password.length < 5){
        throw new ApiError(400 , "Password is too short") 
    }
    if(specialization == ""){
        throw new ApiError(400 , "Specialization is Required")
    }
    if(doctorName == ""){
        throw new ApiError(400 , "Doctor Name is Required")
    }
    const existedDoctor = await Doctor.findOne({email});

    if(existedDoctor){
        throw new ApiError(409 , "Doctor already exists with same email")
    }
    const createdDoctor = await Doctor.create({
        doctorName , 
        specialization ,
        password, 
        email
    })

    const newDoctor = await Doctor.findById(createdDoctor._id).select(
        "-password -refreshToken"
    )
    if(!newDoctor){
        throw new ApiError(500 , "Sever error while registering the doctor")
    }

    
    return res.status(200).json(
        new ApiResponse(200 , newDoctor , "Doctor registered successfully")
    );

} )

const loginDoctor = asyncHandler (async (req , res) => {

})

export {registerDoctor , loginDoctor}