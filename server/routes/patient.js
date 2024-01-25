import { Router } from 'express';
import Patient from '../models/patientSchema.js';

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

export default PatientRouter;
