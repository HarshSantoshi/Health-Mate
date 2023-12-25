import { Router } from 'express';
import Doctor from '../models/doctorSchema';
const router = Router();
import { body, validationResult } from 'express-validator';
import { genSaltSync, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
require("dotenv").config();

// ROUTE:1 CREATE a Doctor using : POST "/api/auth/createdoctor" No login required

router.post('/createdoctor',[
    body('specialization','minimum length of 3 characters required').isLength({min:3}),
    body('email','must be a valid email').isEmail(),
    body('doctorName','minimum 3 characters').isLength({ min:3 }),
    body('password','Password must be atleast 5 characters ').isLength({ min: 5 }),
    body('username','Username must be unique and minimum 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
    let success = false;
    // if bad request return errors and bad request
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether a doctor with this email already exists:
    try{
        let doctor = await Doctor.findOne({email: req.body.email});
        if(doctor){       
            return res.status(400).json({success, error: "account with this email already exists!"});
        }
        doctor = await Doctor.findOne({username: req.body.username});
        if(doctor){       
            return res.status(400).json({success, error: "account with this username exists!"});
        }
        // 10 rounds of hashing
        const salt =  genSaltSync(10);
        const secPass = await hash(req.body.password,salt);
        doctor = await Doctor.create({
            specialization: req.body.specialization,
            email:req.body.email,
            password: secPass,
            username:req.body.username,
            doctorName: req.body.doctorName
        });
        const data= {
            doctor:{
                id: doctor.id
            }
        }
        const authToken = sign(data,process.env.REACT_APP_JWTSECRET);
        success= true;
        res.json({success, authToken});
    } catch (error){
        res.status(500).send("Some error occured");
    }
});


export default router;