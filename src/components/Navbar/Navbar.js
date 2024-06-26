import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
import toast from 'react-hot-toast';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import cartcontext from '../../context/cart/cartcontext.js';
import doctorcontext from '../../context/Doctor/doctorcontext.js';
import { fetchId } from '../Data/Id.js';
const Logo = styled('img')`
  height : 60px;
  border-radius:50%;
`;
const CartIcon = styled(ShoppingCartIcon)`
  color: grey;
  position: relative;
  
  &:hover{
    color:black;
    cursor:pointer
  }
  
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount, getitems } = useContext(cartcontext);
  const { doctor, fetchData } = useContext(doctorcontext);
  // const [doctorId, setDoctorId] = useState("");
  // const [patientId, setPatientId] = useState("");
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('role') === "patient") {
      getitems();
    }
    else if(localStorage.getItem('token') && localStorage.getItem('role') === "doctor"){
      fetchData(fetchId());
    }
  }, []);
  // useEffect(() => {
  //   // Fetch the token from localStorage
  //   const token = localStorage.getItem('token');
  //   const role = localStorage.getItem('role');

  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     // console.log(decodedToken);
  //     if (role === "doctor") {
  //       const doctorIdFromToken = decodedToken.doctor.id;
  //       fetchData(doctorIdFromToken);
  //       setDoctorId(doctorIdFromToken);
  //       // console.log(doctorId);
  //     }
  //     else if (role === "patient") {
  //       const patientIdFromToken = decodedToken.patient.id;
  //       setPatientId(patientIdFromToken);
  //     }
  //   }
  // }, []);
  const fetchdata = async () => {
    try {
      const response = await fetch("https://health-mate-server.vercel.app/api/v1/auth/patientdetail", {
        method: "GET",
        headers: {
          "token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('role') === "patient") {
      fetchdata();
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success("Logout Successfully");
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ padding: "1px" }}>
        <div className="container-fluid">
          {localStorage.getItem('role') === 'patient' ?
            <Link className="navbar-brand" to="/">
              <Logo src='https://res.cloudinary.com/dgarsqfvl/image/upload/v1716809247/healthmate-images/Logo_pbidd6.png' alt='logo' />
            </Link> :
            <Link className="navbar-brand" to="/dashboard">
              <Logo src='https://res.cloudinary.com/dgarsqfvl/image/upload/v1716809247/healthmate-images/Logo_pbidd6.png' alt='logo' />
            </Link>

          }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {localStorage.getItem('role') === 'patient' ?
                <li className="nav-item" style={{ fontSize: '20px' }}>
                  <Link className="nav-link active" to="/">Home</Link>
                </li>
                : <li className="nav-item" style={{ fontSize: '20px' }}>
                  <Link className="nav-link active" to="/dashboard">Home</Link>
                </li>
              }

              <li className="nav-item" style={{ fontSize: '20px' }}>
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              {/* <li className="nav-item dropdown" style={{ fontSize: '20px' }}>
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Features
                </Link>
                <ul className="dropdown-menu">
                <>
                    {localStorage.getItem('role') === 'patient' ?
                      <li className="nav-item" style={{ fontSize: '16px' ,textAlign:"left"}}>
                        <Link className="nav-link" to={`/bookings`} style={{color:"black"}}>Your Booking</Link>
                      </li>
                      : <li className="nav-item" style={{ fontSize: '16px' ,textAlign:"left"}}>
                        <Link className="nav-link" to={`/dashboard`} style={{color:"black"}}>Your Appointment</Link>
                      </li>
                    }
                    </>
                  <>
                    {localStorage.getItem('role') === 'doctor' ?
                      <li className="nav-item" style={{ fontSize: '16px' ,textAlign:"left"}}>
                        <Link className="nav-link" to={`/chat/${doctorId}`} style={{color:"black"}}>Your chats</Link>
                      </li>
                      : <li className="nav-item" style={{ fontSize: '16px' ,textAlign:"left"}}>
                        <Link className="nav-link" to={`/chat/${patientId}`} style={{color:"black"}}>Your chats</Link>
                      </li>
                    }
                    </>

                </ul>
              </li> */}

              {/* {localStorage.getItem('role') === 'doctor' ?
                <li className="nav-item" style={{ fontSize: '20px' }}>
                  <Link className="nav-link" to={`/chat/${fetchId()}`}>Your chats</Link>
                </li>
                : <li className="nav-item" style={{ fontSize: '20px' }}>
                  <Link className="nav-link" to={`/chat/${fetchId()}`}>Your chats</Link>
                </li>
              } */}
              <li className="nav-item" style={{ fontSize: '20px' }}>
                  <Link className="nav-link" to={`/chat/${fetchId()}`}>Your chats</Link>
                </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            <div style={{ marginLeft: 10 }}>
              {
                !localStorage.getItem('token') ?
                  <>
                    <button type="button" className="btn btn-primary login">
                      <Link to="/login">Login</Link>
                    </button>
                    <button type="button" className="btn btn-info register">
                      <Link to="/register">Register</Link>
                    </button>
                  </> :
                  <>
                    {
                      localStorage.getItem('role') === 'doctor' ?
                        <div style={{ display: 'flex' }}>
                          <div>
                            <Link to="dashboard">
                              <img style={{ height: "50px", borderRadius: "50%" }} src={doctor.doctorImage ? doctor.doctorImage : 'profile.png'} alt="..." />
                            </Link>
                          </div>
                          <button type="button" className="btn btn-primary login">
                            <Link to="/doctorprofile">Profile </Link>
                          </button>
                          <button onClick={handleLogout} type="button" className="btn btn-info register">
                            Logout
                          </button>
                        </div>
                        :
                        <div>
                          <Badge badgeContent={cartCount} color="primary">

                            <Link to={`/cart`} ><CartIcon /></Link>

                          </Badge>
                          <button type="button" className="btn btn-primary login">
                            <Link to="/patientprofile">Profile</Link>
                          </button>
                          <button onClick={handleLogout} type="button" className="btn btn-info register">
                            Logout
                          </button>
                        </div>
                    }
                  </>

              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;