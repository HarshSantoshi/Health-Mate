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
  const handleEditProfile = () => {
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setEdit(false);
  };
  return (
    <div className='profilecontainer'>
      <div className='profileImage'>
        <img src='avatar-img.png' alt='Profile' />
        <button>Change Profile image</button>
      </div>
      <div className='detail-heading'>Your Profile</div>
      <div className='details'>
        {profileData && (
          <div className='profileForm'>
            <form onSubmit={handleSubmit}>
            <label htmlFor="patientName">Name: </label>
              <input
                type='text'
                id="patientName"
                name="patientName"
                value={profileData.patientName}
                readOnly={!edit}
                onChange={(e) => setProfileData({ ...profileData, patientName: e.target.value })}
              />
              <br />
              <label htmlFor="email">Email: </label>
              <input type='email' id="email" value={profileData.email} name="email" readOnly = {!edit}
              />
              <br />
              <label htmlFor="gender">Gender: </label>
              <label htmlFor="M">Male</label>
              <input type='radio' id="M" name='gender' value="M" readOnly={!edit} />
              <label htmlFor="F">Female</label>
              <input type='radio' id="F" name='gender' value="F" readOnly={!edit} />
              <label htmlFor="O">Other</label>
              <input type='radio' id="O" name='gender' value="O" readOnly={!edit} />
              <br />
              <label htmlFor="dateofBirth">Date of Birth:</label>
              <input type='date' id="dateofBirth" value={profileData.dateOfBirth} name="dateofBirth" readOnly={!edit} />
              <br />
              <label htmlFor="disease">Disease: </label>
              <input type='text' id="disease" name="disease" value={profileData.disease} readOnly={!edit} />
              <br />
              <label htmlFor="phoneNo">Contact Number: </label>
              <input type='number' id="phoneNo" value={profileData.contactNumber} name="phoneNo" readOnly={!edit} 
              onChange={(e) => setProfileData({ ...profileData, phoneNo: e.target.value })}
              />
              <br />
              <label htmlFor="bloodGroup">Blood Group: </label>
              <input type='text' id="bloodGroup" name="bloodGroup" value={profileData.bloodGroup} readOnly={!edit} 
              onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
              />
              <br />

              {!edit ? (
                <button type="button" onClick={handleEditProfile}>Edit Profile</button>
              ) : (
                <div>
                  <button type="submit">Save Changes</button>
                  <button type="button" onClick={() => setEdit(false)}>Cancel</button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
