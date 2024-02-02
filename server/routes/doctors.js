import { Router } from 'express';
import Doctor from '../models/doctorSchema.js';
import { fetchDoctor } from '../middleware/fetchDoctor.js';

const DoctorRouter = Router();

DoctorRouter.get("/getalldoctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});

    if (!doctors.length) {
      return res.status(404).json({ error: "No doctors found" });
    }

    return res.status(200).json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
DoctorRouter.get('/getdoctor/:id', async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    return res.status(200).json({doctor});
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

DoctorRouter.post('/addeducation',fetchDoctor, async (req, res) => {
  const { institution, speciality, startdate, enddate } = req.body;
  const doctorId = req.doctor.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    doctor.education.unshift({ institution, speciality, startdate, enddate });
    await doctor.save();

    res.status(201).json(doctor.education);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

DoctorRouter.delete('/deleteeducation/:id',fetchDoctor, async (req, res) => {
  const id = req.params.id;
  const doctorId = req.doctor.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const index = doctor.education.findIndex(edu => edu._id.toString() === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Education not found' });
    }
    doctor.education.splice(index, 1);
    await doctor.save();
    res.status(200).json(doctor.education);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

DoctorRouter.post('/addexperience',fetchDoctor, async (req, res) => {
  const { hospital, service, startdate, enddate } = req.body;
  const doctorId = req.doctor.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    doctor.experience.unshift({ hospital, service, startdate, enddate });
    await doctor.save();

    res.status(201).json(doctor.experience);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

DoctorRouter.delete('/deleteexperience/:id',fetchDoctor, async (req, res) => {
  const id = req.params.id;
  const doctorId = req.doctor.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const index = doctor.experience.findIndex(exp => exp._id.toString() === id);
    if (index === -1) {
      return res.status(404).json({ error: 'experience not found' });
    }
    doctor.experience.splice(index, 1);
    await doctor.save();
    res.status(200).json(doctor.experience);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

DoctorRouter.put('/updatedoctor', fetchDoctor, async (req, res) => {
  try {
      const {specialization,experienceYrs,about,fees,currentlyserving,phoneNo} = req.body;
      const newdoctor = {};
      if(specialization){newdoctor.specialization = specialization};
      if(experienceYrs){newdoctor.experienceYrs = experienceYrs};
      if(about){newdoctor.about = about};
      if(fees){newdoctor.fees = fees};
      if(currentlyserving){newdoctor.currentlyserving = currentlyserving};
      if(phoneNo){newdoctor.phoneNo = phoneNo};

      let record = await Doctor.findById(req.doctor.id);
      if(!record){
          return res.status(404).send("Not Found");
      }

      record = await Doctor.findByIdAndUpdate(req.doctor.id,{$set:newdoctor},{new:true});
      res.json({record});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
  }
})
export default DoctorRouter;
