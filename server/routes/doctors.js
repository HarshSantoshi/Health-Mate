import { Router } from 'express';
import Doctor from '../models/doctorSchema.js';

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

export default DoctorRouter;
