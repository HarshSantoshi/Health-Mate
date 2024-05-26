import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard.js';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';

const Input = styled('input')`
font-size : 16px;
padding:5px;
border-bottom:4px solid black;
border-radius:10px;
color:darkblue;
`
const DoctorPage = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [query, setQuery] = useState(""); // Added query state

  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      const decodedToken = jwtDecode(token);
      if (role === "doctor") {
        const doctorIdFromToken = decodedToken.doctor.id;
        setDoctorId(doctorIdFromToken);
      } else {
        const patientIdFromToken = decodedToken.patient.id;
        setPatientId(patientIdFromToken);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://health-mate-server-new.vercel.app/api/v1/doctors/getalldoctors");
        const data = await response.json();
        setAllDoctors(data.doctors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    // Filter doctors based on the search query
    setQuery(value);
    const filtered = allDoctors.filter((doctor) =>
      doctor.doctorName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div>
      <h1>Doctor Page</h1>
      <div style={{position:"absolute" , right : '20px' , top:'92px'}}>
      <Input
        placeholder='Search Doctor'
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      </div>

      <div style={{ height: "auto", display: "flex", flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {filteredDoctors.length
          ? filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} props={{ name: doctor.doctorName, specialization: doctor.specialization, fees: doctor.fees, id: doctor._id, rating: "4.6", totalRatings: '10', patientId: patientId }} />
          ))
          : allDoctors.map((doctor, index) => (
            <DoctorCard key={index} props={{ name: doctor.doctorName, specialization: doctor.specialization, fees: doctor.fees, id: doctor._id, rating: "4.6", totalRatings: '10', patientId: patientId }} />
          ))}
      </div>
    </div>
  );
};

export default DoctorPage;
