import { Router } from "express";
import Doctor from "../models/doctorSchema.js";
import Patient from "../models/patientSchema.js";
import AppointmentModel from "../models/appointmentSchema.js";
import { fetchPatient } from '../middleware/fetchPatient.js';
import { fetchDoctor } from '../middleware/fetchDoctor.js';
const AppointmentRouter = Router();
AppointmentRouter.get('/getallappointments', fetchDoctor, async (req, res) => {
    const doctorId = req.doctor.id;
    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor){
            return res.status(404).json({ error: 'Doctor not found' });
        }
        const appointments = await AppointmentModel.find({ doctorId })
    .sort({ date: 1, starttime: 1, endtime: 1 });

        return res.status(200).json({ appointments , success: true });
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
AppointmentRouter.get('/getallbookings' , fetchPatient , async(req , res)=>{
    const patientId = req.patient.id;
    try {
        const patient = await Patient.findById(patientId);

        if (!patient){
            return res.status(404).json({ error: 'patient not found' });
        }
        const appointments = await AppointmentModel.find({ patientId })
    .sort({ date: 1, starttime: 1, endtime: 1 });

        return res.status(200).json({ appointments , success: true });
    } catch (error) {
        console.error('Error fetching patient bookings:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }  
})
export default AppointmentRouter;