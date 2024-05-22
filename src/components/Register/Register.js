import React from 'react'
import { useState } from 'react';
import {TextField,MenuItem, Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import  {toast}  from 'react-hot-toast';
import './Register.css'

const Register = () => {
  const doctorTypes = [
    "Allergist",
    "Anesthesiologist",
    "Cardiologist",
    "Child Specialist",
    "Dermatologist",
    "Dietitian",
    "Emergency Medicine Physician",
    "Endocrinologist",
    "Gastroenterologist",
    "Gastrointestinal Surgeon",
    "General Surgeon",
    "Genetic Counselor",
    "Geriatrician",
    "Hematologist",
    "Hepatologist",
    "Hospice and Palliative Medicine Specialist",
    "Infectious Disease Specialist",
    "Integrative Medicine Doctor",
    "Interventional Radiologist",
    "Maxillofacial Surgeon",
    "Nephrologist",
    "Neurologist",
    "Nuclear Medicine Specialist",
    "Obstetrician",
    "Oncologist",
    "Ophthalmologist",
    "Orthopedic Surgeon",
    "Otolaryngologist (ENT Specialist)",
    "Pain Management Specialist",
    "Pathologist",
    "Pediatrician",
    "Physician",
    "Plastic Surgeon",
    "Podiatrist",
    "Proctologist",
    "Psychiatrist",
    "Pulmonologist",
    "Radiologist",
    "Rheumatologist",
    "Sleep Medicine Specialist",
    "Sports Medicine Specialist",
    "Telemedicine Specialist",
    "Urologist"
  ];
  
  const [credentials , setCredentials] = useState({userType:"" , name : "" , email:"", password :"" , specialization:"" , doctorName : ""});
  const navigate = useNavigate();
  const handleChange=(e)=>{
    const value = e.target.value;
    const name = e.target.name;
    // console.log(name + " " + value);
    setCredentials((prev)=>{
      return {
        ...prev , [name] : value
        
      }
    })
  
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(credentials.userType === 'doctor'){
      const response = await fetch("http://localhost:8000/api/v1/auth/createdoctor", {
        method :"POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            specialization: credentials.specialization,
            email:credentials.email,
            password: credentials.password,
            doctorName: credentials.doctorName
        })
      })
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token', json.authToken); 
        localStorage.setItem('role','doctor');
        navigate("/dashboard");
        toast.success("Doctor account created successfully!");
      }
      else{  
        toast.error("Invalid Credentials");
      }
    }
    else if(credentials.userType === 'patient'){
      const response = await fetch("http://localhost:8000/api/v1/auth/createpatient", {
        method :"POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            email:credentials.email,
            password: credentials.password,
            name: credentials.name
        })
      })
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token', json.authToken); 
        localStorage.setItem('role','patient');
        navigate("/");
        toast.success("Patient account created successfully!");
      }
      else{
        toast.error("Invalid Credentials");
      }
    }
    else{
      toast.error("Select a user type");
    }
    
  }
  return (
    <div className='outer-box' style={{minHeight:'100vh'}}>
      <h1 className='login-headertext'>Register</h1>
        <div className="sub-box">
        <Paper sx={{padding:"2rem"}}>
            <TextField  sx={{marginBottom:"1rem"}} size='small' label='Select User Type' select value={credentials.userType} name='userType' onChange={handleChange} color="secondary" fullWidth required>
                <MenuItem value='patient'>Patient</MenuItem>
                <MenuItem value='doctor'>Doctor</MenuItem>
            </TextField>
               {credentials.userType==='doctor'?
               <form onSubmit={(e) => handleSubmit(e)} action='/createdoctor' method='POST'>
                    <TextField  sx={{marginBottom:"1rem"}} select value={credentials.specialization} onChange={handleChange} name='specialization' size='small' label='Specialization' color='secondary'  fullWidth required>
                    {doctorTypes.map((value, idx) => (
                      <MenuItem value={value} key={idx}>
                        {value}
                      </MenuItem>
                    ))}
                    </TextField>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.doctorName} onChange={handleChange} name='doctorName' size='small' label='Doctor name' helperText='Enter your full name' color='secondary' fullWidth required/>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.email} onChange={handleChange} name='email' size='small' type='email' label='Email-ID' color='secondary' fullWidth required/>
                    <TextField sx={{marginBottom:"1rem"}} value={credentials.password} onChange={handleChange} name='password' size='small' type = 'password' helperText='Minimum 5 characters' label='Password' color='secondary' fullWidth required/>
                    <button type='submit' className='btn'>Register</button>
               </form>:
               <form onSubmit={(e) => handleSubmit(e)} action='/createpatient' method='POST' >
                    <TextField value={credentials.name}  sx={{marginBottom:"1rem"}} name='name' onChange={handleChange} size='small' label='Your Name' helperText='Enter your full name' color='secondary' fullWidth required/>
                    <TextField  value={credentials.email} sx={{marginBottom:"1rem"}} name='email' onChange={handleChange} size='small' type='email' label='Email-ID' color='secondary' fullWidth required/>
                    <TextField value={credentials.password} sx={{marginBottom:"1rem"}} name='password' onChange={handleChange} size='small' type = 'password' helperText='Minimum 5 characters' label='Password' color='secondary' fullWidth required/>
                    <button type='submit' className='btn'>Register</button>
               </form>}
        </Paper>
        </div>
    </div>
  )
}

export default Register
