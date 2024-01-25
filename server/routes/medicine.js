import { Router } from 'express';
import Medicine from '../models/medicineSchema.js';

const MedicineRouter = Router();

MedicineRouter.get("/getallmedicine", async (req, res) => {
  try {
    const medicine = await Medicine.find({});

    if (!medicine.length) {
      return res.status(404).json({ error: "No Medicine found" });
    }

    return res.status(200).json({ medicine });
  } catch (error) {
    console.error("Error fetching Medicine:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

MedicineRouter.get('/medicinedetail/:id', async(req , res) => {
  try {
      const medicineid = req.params.id;
      const medicine = await Medicine.findById(medicineid);
      res.send(medicine);
  } catch (error) {
      res.status(500).send("Internal Server Error");
  }
})

export default MedicineRouter