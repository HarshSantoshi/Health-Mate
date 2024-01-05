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
    <div>
      <h1>Doctor Page</h1>
      <div style={{height:"400px" , display:"flex", flex :"wrap"}}>
      {allDoctors.map((doctor, index) => (
          
            <DoctorCard key={index} props={{ name: doctor.doctorName , specialization:doctor.specialization , fees : doctor.fees }}  />
         
      ))}
       </div>
    </div>
  );
};

export default DoctorPage;
