import { Router } from 'express';
import Doctor from '../models/doctorSchema.js';
import Patient from '../models/patientSchema.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import { fetchPatient } from '../middleware/fetchPatient.js';

const Authrouter = Router();
// ROUTE:1 CREATE a Doctor using : POST "/api/auth/createdoctor" No login required
const { genSaltSync, hash } = bcrypt;
const { sign } = jwt;
Authrouter.post('/createdoctor',[
    body('specialization','minimum length of 3 characters required').isLength({min:3}),
    body('email','must be a valid email').isEmail(),
    body('doctorName','minimum 3 characters').isLength({ min:3 }),
    body('password','Password must be atleast 5 characters ').isLength({ min: 5 })
],async(req,res)=>{
    let success = false;
    // if bad request return errors and bad request
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether a doctor with this email already exists:
    try{
        const doctor = await Doctor.findOne({email: req.body.email});
        if(doctor){       
            return res.status(400).json({success, error: "Account already exists!"});
        }
        if(req.body.password.length<5){
            return res.status(400).json({success, error: "Enter a strong password!"});
        }
        // 10 rounds of hashing
        const salt =  genSaltSync(10);
        const secPass = await hash(req.body.password,salt);
        const newDoctor = await Doctor.create({
            specialization: req.body.specialization,
            email:req.body.email,
            password: secPass,
            doctorName: req.body.doctorName
        });
        const data= {
            doctor:{
                id: newDoctor.id
            }
        }
        const authToken = sign(data,process.env.ACCESS_TOKEN_SECRET);
        success= true;
        res.json({success, authToken});
    } catch (error){
        res.status(500).send({err: "Some error occured"});
    }
});
Authrouter.post('/createpatient',[
    body('email','must be a valid email').isEmail(),
    body('name','minimum 3 characters').isLength({ min:3 }),
    body('password','Password must be atleast 5 characters ').isLength({ min: 5 })
],async(req,res)=>{
    let success = false;
    // if bad request return errors and bad request
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether a patient with this email already exists:
    try{
        const patient = await Patient.findOne({email: req.body.email});
        if(patient){       
            return res.status(400).json({success, error: "Account already exists!"});
        }
        if(req.body.password.length<5){
            return res.status(400).json({success, error: "Enter a strong password!"});
        }
        
        // 10 rounds of hashing
        const salt =  genSaltSync(10);
        const secPass = await hash(req.body.password,salt);
        const newPatient = await Patient.create({
            email:req.body.email,
            password: secPass,
            patientName: req.body.name
        });
        const data= {
            patient:{
                id: newPatient.id
            }
        }
        const authToken = sign(data,process.env.ACCESS_TOKEN_SECRET);
        success= true;
        res.json({success, authToken});
    } catch (error){
        res.status(500).send("Some error occured");
    }
});

Authrouter.post('/logindoctor' ,[
    body('email').isEmail(),
    body('password').exists()
] , async(req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({success , errors : errors.array()});
    }
    const {email ,password} = req.body;
    try {
        const doctor = await Doctor.findOne({email});
        if(!doctor){
            return res.status(400).json({success, error : "Incorrect Credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password , doctor.password);
        if(!isPasswordCorrect){
            return res.status(401).json({success ,error :"Wrong password"});
        }
        const data = {
            doctor :{
                id : doctor.id
            }
        }
        const authToken = jwt.sign(data , process.env.ACCESS_TOKEN_SECRET );
        success = true;
        return res.json({success , authToken});
        
    } catch (error) {
        res.status(500).send("internal server error");
    }
})

Authrouter.post('/loginpatient' ,[
    body('email').isEmail(),
    body('password').exists()
] , async(req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({success , errors : errors.array()});
    }
    const {email ,password} = req.body;
    try {
        const patient = await Patient.findOne({email});
        if(!patient){
            return res.status(400).json({success, error : "Incorrect Credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password , patient.password);
        if(!isPasswordCorrect){
            return res.status(401).json({success ,error :"Wrong password"});
        }
        const data = {
            patient :{
                id : patient.id
            }
        }
        const authToken = jwt.sign(data , process.env.ACCESS_TOKEN_SECRET );
        success = true;
        return res.json({success , authToken});
        
    } catch (error) {
        res.status(500).send("internal server error");
    }
})
Authrouter.get('/patientdetail', fetchPatient , async(req , res) => {
    try {
        const patientId = req.patient.id;
        const patient = await Patient.findById(patientId);
        
        res.send(patient);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})
export default Authrouter;