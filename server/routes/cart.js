import { Router } from 'express';
import Medicine from '../models/medicineSchema.js';
import Patient from '../models/patientSchema.js';
import { fetchPatient } from '../middleware/fetchPatient.js';

const CartRouter = Router();

CartRouter.post('/additem',fetchPatient,async (req,res)=>{
    try {
        const id = req.body.id;
        const data = await Medicine.findById(id);
        const patientId = req.patient.id;
        const patient = await Patient.findById(patientId);
        const existingitem = patient.carts.find(item => item._id.toString() === id);
        if(existingitem){
            
            res.status(200).json({message:"Already Exist", quantity: existingitem.quantity});
        }
        else if(patient){
            const cartdata = await patient.addtocart(data);
            res.status(200).json(patient.carts);
        }
        else{
            res.status(401).json({error:"Invalid user"});
        }
    } catch (error) {
        res.status(401).json({ error: "error" });
    }
});

CartRouter.get('/fetchitems',fetchPatient,async (req,res)=>{
    try {
        const patientId = req.patient.id;
        const patient = await Patient.findById(patientId);
        if(patient){
            const items = patient.carts;
            res.status(200).json(items);
        }
        else{
            res.status(401).send("Invalid user");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

CartRouter.delete('/deleteitem/:id', fetchPatient, async (req, res) => {
    try {
        const id = req.params.id;
        const patientId = req.patient.id;
        const patient = await Patient.findById(patientId);

        if (patient) {
            const cartdata = await patient.removeFromCart(id);
            await patient.save();
            
            res.status(200).json(patient.carts);

        } else {
            res.status(401).send("Invalid User");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});


CartRouter.put('/updateitem',fetchPatient,async (req,res)=>{

    try {
        const {id,quantity} = req.body;
        const patientId = req.patient.id;
        const patient = await Patient.findById(patientId);
        const data = await Medicine.findById(id);
        if(patient){
            const cartdata = await patient.updateCartItemQuantity(id,quantity);
            // await patient.save();
            res.status(200).json({cart :  patient.carts , medicine : data});
        }
        else{
            res.status(401).send("Invalid User");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

export default CartRouter;