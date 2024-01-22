import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard.js';

const DoctorPage = () => {
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/doctors/getalldoctors");
        const data = await response.json();
        setAllDoctors(data.doctors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      <h1>Doctor Page</h1>
      <div style={{ height: "auto", display: "flex" , flexWrap: 'wrap', justifyContent:'space-evenly' }}>
        {allDoctors.map((doctor, index) => (

          <DoctorCard key={index} props={{ name: doctor.doctorName, specialization: doctor.specialization, fees: doctor.fees, id: doctor._id, rating: "4.6", totalRatings :'10' }} />

        ))}
      </div>
    </div>
  );
};

export default DoctorPage;
