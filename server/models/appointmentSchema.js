import  { Schema, model } from 'mongoose';
const appointmentSchema = new Schema({
    patientId : {
        type : String , 
        required : true
    },
    doctorId : {
        type : String , 
        required : true
    },
    date : {
        type : String , 
        required : true
    },
    starttime : {
        type : String, 
        required : true
    },
    endtime : {
        type : String,
        required:true
    }
    ,
    status :{
        type : String , 
        required : true,
        default : "pending"
    }
},{timestamps:true})

const AppointmentModel = model("AppointmentModel",appointmentSchema);
export default AppointmentModel;