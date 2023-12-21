import React from 'react'
import { useState } from 'react';
import {TextField,MenuItem, Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [credentials , setCredentials] = useState({userType:"" , email:"", password :""});
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
