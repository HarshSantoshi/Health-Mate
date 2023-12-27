import React from 'react'
import { useState } from 'react';
import {TextField,MenuItem, Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
// import  toast  from 'react-hot-toast';
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
  
  const [credentials , setCredentials] = useState({userType:"" , name : "" , email:"" , username :"" , password :"" , specialization:""});
  const navigate = useNavigate();
  const handleChange=(e)=>{
    const value = e.target.value;
    const name = e.target.name;
    console.log(name + " " + value);
    setCredentials((prev)=>{
      return {
        ...prev , [name] : value
        
      }
    })
  
  }
  const handleSubmit = ()=>{
    if(credentials.userType ==='doctor'){
      navigate('/doctorPage');
    }
    else if(credentials.userType === 'patient'){
      navigate('/patientpage');
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
               <form onSubmit={handleSubmit} action='/createdoctor' method='POST'>
                    <TextField  sx={{marginBottom:"1rem"}} select value={credentials.specialization} onChange={handleChange} name='specialization' size='small' label='Specialization' color='secondary'  fullWidth required>
                    {doctorTypes.map((value, idx) => (
                      <MenuItem value={value} key={idx}>
                        {value}
                      </MenuItem>
                    ))}
                    </TextField>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.name} onChange={handleChange} name='name' size='small' label='Doctor name' helperText='Enter your full name' color='secondary' fullWidth required/>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.username} onChange={handleChange} name='username' size='small' label='Username' helperText='Username must be unique' color='secondary' fullWidth required/>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.email} onChange={handleChange} name='email' size='small' type='email' label='Email-ID' color='secondary' fullWidth required/>
                    <TextField sx={{marginBottom:"1rem"}} value={credentials.password} onChange={handleChange} name='password' size='small' type = 'password' helperText='Minimum 5 characters' label='Password' color='secondary' fullWidth required/>
                    <button type='submit' className='btn'>SignUp</button>
               </form>:
               <form action='/createpatient' method='POST' onSubmit={handleSubmit}>
                    <TextField value={credentials.name}  sx={{marginBottom:"1rem"}} name='name' onChange={handleChange} size='small' label='Your Name' helperText='Enter your full name' color='secondary' fullWidth required/>
                    <TextField value={credentials.username}  sx={{marginBottom:"1rem"}} name='username' onChange={handleChange} size='small' label='Username' helperText='Username must be unique' color='secondary' fullWidth required/>
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
