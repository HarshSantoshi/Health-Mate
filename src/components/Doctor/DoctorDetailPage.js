import React from 'react'
import { useLocation } from 'react-router-dom';

const DoctorDetailPage = () => {
    const location = useLocation();
    const doctorID = location.state?.doctorID;
    const doctorInformation = location.state?.info;
  return (
    <div>
       
      <h2>Detail Page</h2>
      {/* {console.log(doctorInformation)} */}
      Name : {doctorInformation.name}
      
    </div>
  )
}

export default DoctorDetailPage
