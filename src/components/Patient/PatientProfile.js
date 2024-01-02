import React, { useState, useEffect } from 'react';
import './patientprofile.css';

const PatientProfile = () => {
  const [profileData, setProfileData] = useState();
  const [edit , setEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/auth/patientdetail", {
          method: "GET",
          headers: {
            "token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        setProfileData(json);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchData();
  }, []); 
  return (
    <div className='profilecontainer'>
      <div className='profileImage'>
        <img src='avatar-img.png' alt='This is profile' />
        <button>Change Profile image</button>
      </div>
      <div className='detail-heading'>Your Profile</div>
      <div className='details'>
        {profileData && (
          <div className='profileForm'>
            <label for="patientName">Name : </label>
            <input type='text' id = "patientName" name = "patientName" value={profileData.patientName}/>
            <br/>
            <label for="email">Email : </label>
            <input type='email' id = "email" value={profileData.email} name = "email"/>
            <br/>
            <label for="Gender">Gender : </label>
            <label for="M">Male</label>
            <input type='radio' id = "M" name='gender' value="M"/>
            <label for="F">Female</label>
            <input type='radio' id = "F" name='gender' value="F"/>
            <label for="O">Other</label>
            <input type='radio' id = "O" name='gender' value="O"/>
            <br/>
            <label for="dateofBirth">Date of Birth :</label>
            <input type='date' id = "dateofBirth" value="" name = "dateofBirth"/>
            <br/>
            <label for="disease">Disease : </label>
            <input type='text' id = "disease" name ="disease" value=""/>
            <br/>
            <label for="phoneNo">Contact Number : </label>
            <input type='number' id = "phoneNo" value="" name = "phoneNo"/>
            <br/>
            <label for="bloodGroup">Blood Group : </label>
            <input type='text' id = "bloodGroup" name ="bloodGroup" value=""/>
            <br/>
            
            <input type="submit" value="Submit" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
