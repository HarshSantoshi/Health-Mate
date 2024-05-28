import React from 'react'
import { useState,useContext } from 'react';
import {TextField,MenuItem, Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import doctorcontext from '../../context/Doctor/doctorcontext.js';
import cartcontext from '../../context/cart/cartcontext.js';
import { fetchId } from '../Data/Id.js';
// changessss
const Login = () => {
  const [credentials , setCredentials] = useState({userType:"" , email:"", password :""});
  const navigate = useNavigate();
  const { fetchData } = useContext(doctorcontext);
  const { getitems } = useContext(cartcontext);
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
      const response = await fetch("https://health-mate-server.vercel.app/api/v1/auth/logindoctor", {
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
        const doctorid = fetchId();
        fetchData(doctorid);
        navigate("/dashboard");
        toast.success("Logged In successfully!");
      }
      else{  
        toast.error("Invalid Credentials");
      }
    }
    else if(credentials.userType === 'patient'){
      const response = await fetch("https://health-mate-server.vercel.app/api/v1/auth/loginpatient", {
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
        // console.log(json.authToken);
        fetchId();
        getitems();
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
