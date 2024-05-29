import { Router } from 'express';
import Patient from '../models/patientSchema.js';
import Appointment from '../models/appointmentSchema.js';
import { fetchPatient } from '../middleware/fetchPatient.js';
const PatientRouter = Router();

PatientRouter.get("/getallpatients", async (req, res) => {
  try {
    const patients = await Patient.find({});

    if (!patients.length) {
      return res.status(404).json({ error: "No patients found" });
    }

    return res.status(200).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
PatientRouter.get('/getpatient/:id', async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    return res.status(200).json({ patient });
  } catch (error) {
    console.error('Error fetching patient details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
PatientRouter.put('/updatepatientimage', fetchPatient, async (req, res) => {
  try {
      const {patientImage} = req.body;
      const newpatient = {};
      
      newpatient.patientImage = patientImage;
      

      let record = await Patient.findById(req.patient.id);
      if(!record){
          return res.status(404).send("Not Found");
      }

      record = await Patient.findByIdAndUpdate(req.patient.id,{$set:newpatient},{new:true});
      res.json({record});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
  }
})
PatientRouter.put('/updatepatient', fetchPatient, async (req, res) => {
  try {
      const {phoneNo,gender,bloodGroup,disease,dateofBirth} = req.body;
      const newpatient = {};
      if(phoneNo){newpatient.phoneNo = phoneNo};
      if(gender){newpatient.gender = gender};
      if(bloodGroup){newpatient.bloodGroup = bloodGroup};
      if(disease){newpatient.disease = disease};
      if(dateofBirth){newpatient.dateofBirth = dateofBirth};
      

      let record = await Patient.findById(req.patient.id);
      if(!record){
          return res.status(404).send("Not Found");
      }

      record = await Patient.findByIdAndUpdate(req.patient.id,{$set:newpatient},{new:true});
      res.json({record});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
  }
})
PatientRouter.post("/checkavailability" ,async(req , res)=>{
  try {
    const { date , starttime , endtime , doctorId } = req.body;
    const appointments = await Appointment.find({
      doctorId: doctorId,
      date: date,
      starttime: starttime,
      endtime: endtime,
      status: "approved"
    });
    
    if(appointments.length == 0){
      return res.status(200).send({

        message :"Appointment available",
        success : true
      })
    }
    else{
      return res.status(200).send({
        message:"Appointment not available",
        success : false
      })
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})
PatientRouter.post("/bookappointment" ,async(req , res)=>{
  try {
    const { date , starttime , endtime , doctorId , patientId} = req.body;
    const newAppointment = await Appointment.create({
      doctorId ,
      date,
      patientId,
      starttime,
      endtime,
      status : "approved"
    })
    
    return res.status(200).json({
      appointment :newAppointment,
      success : true
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})

export default PatientRouter;
