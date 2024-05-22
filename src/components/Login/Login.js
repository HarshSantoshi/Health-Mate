import React from 'react'
import { useState } from 'react';
import {TextField,MenuItem, Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
//change
const Login = () => {
  const [credentials , setCredentials] = useState({userType:"" , email:"", password :""});
  const navigate = useNavigate();
  const handleChange=(e)=>{
    const value = e.target.value;
    const name = e.target.name;
    setCredentials((prev)=>{
      return {
        ...prev , [name] : value
        
      }
    })
  
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(credentials.userType === 'doctor'){
      const response = await fetch("http://localhost:8000/api/v1/auth/logindoctor", {
        method :"POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            email:credentials.email,
            password: credentials.password,
        })
      })
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token', json.authToken); 
        localStorage.setItem('role','doctor');
        
        navigate("/dashboard");
        toast.success("Logged In successfully!");
      }
      else{  
        toast.error("Invalid Credentials");
      }
    }
    else if(credentials.userType === 'patient'){
      const response = await fetch("http://localhost:8000/api/v1/auth/loginpatient", {
        method :"POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            email:credentials.email,
            password: credentials.password
        })
      })
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token', json.authToken); 
        localStorage.setItem('role','patient');
        navigate("/");
        toast.success("Patient Logged In successfully!");
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
    <>
    <div className='outer-box' style={{minHeight:'100vh'}}>
      <h1 className='login-headertext'>Login</h1>
        <div className="sub-box">
        <Paper sx={{padding:"2rem"}}>
            <TextField  sx={{marginBottom:"1rem"}} size='small' label='Select User Type' select value={credentials.userType} name='userType' onChange={handleChange} color="secondary" fullWidth required>
                <MenuItem value='patient'>Patient</MenuItem>
                <MenuItem value='doctor'>Doctor</MenuItem>
            </TextField>
            <form onSubmit={handleSubmit}>
              <TextField  value={credentials.email} sx={{marginBottom:"1rem"}} name='email' onChange={handleChange} size='small' type='email' label='Email-ID' color='secondary' fullWidth required/>
              <TextField value={credentials.password} sx={{marginBottom:"1rem"}} name='password' onChange={handleChange} size='small' type = 'password' label='Password' color='secondary' fullWidth required/>
              <button type='submit' className='btn'>Login</button>
            </form>
        </Paper>
        </div>
    </div>
    </>
  )
}

export default Login
