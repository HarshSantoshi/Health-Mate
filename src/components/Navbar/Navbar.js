import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken);
      if(role == "doctor"){
        const doctorIdFromToken = decodedToken.doctor.id;

        setDoctorId(doctorIdFromToken);
        // console.log(doctorId);
      }
      else{
        const patientIdFromToken = decodedToken.patient.id;
        setPatientId(patientIdFromToken);
      }
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">LOGO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">About Us</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Features
                </Link>
                <ul className="dropdown-menu">
                  {/* <li><a className="dropdown-item" href="#">Feature 1</a></li>
            <li><a className="dropdown-item" href="#">Feature 2</a></li> */}

                </ul>
              </li>

              {localStorage.getItem('role') === 'doctor' ?
                <li className="nav-item">
                  <Link className="nav-link" to={`/chat/${doctorId}`}>Your chats</Link>
                </li>
                : <li className="nav-item">
                <Link className="nav-link" to={`/chat/${patientId}`}>Your chats</Link>
              </li>
              }

            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
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
                        <div>
                          <button type="button" className="btn btn-primary login">
                            <Link to="/doctorprofile">Profile </Link>
                          </button>
                          <button onClick={handleLogout} type="button" className="btn btn-info register">
                            Logout
                          </button>
                        </div> :
                        <div>
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
