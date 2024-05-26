import React, { useState, useEffect } from 'react';
import './patientprofile.css';

const PatientProfile = () => {
  const [profileData, setProfileData] = useState();
  const [edit, setEdit] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("https://health-mate-server.vercel.app/api/v1/auth/patientdetail", {
        method: "GET",
        headers: {
          "token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      json.dateofBirth = updatedate(json.dateofBirth);
      setProfileData(json);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updatepatient = async (phoneNo, gender, bloodGroup, disease, dateofBirth) => {
    try {
      const response = await fetch(`https://health-mate-server.vercel.app/api/v1/patient/updatepatient`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem('token')
        },
        body: JSON.stringify({ phoneNo, gender, bloodGroup, disease, dateofBirth }),
      });
      fetchData();
    } catch (error) {
      console.error('Error Updating patient details:', error);
    }
  }
  const handleEditProfile = () => {
    setEdit(true);
  };
  const updatedate = (dateString) => {

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newdate = updatedate(profileData.dateofBirth);
    updatepatient(profileData.phoneNo, profileData.gender, profileData.bloodGroup, profileData.disease, newdate);
    setEdit(false);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    fetchData();
    setEdit(false);
  }
  const onchange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }
  return (
    <div className='profilecontainer'>
      <div className='row'>
        <div className='col-md-4 d-flex align-items-center justify-content-center image-container'>
          <div className='profileImage'>
            <img src='profile.png' alt='Profile' />
            <button className="btn btn-primary mt-3">Change Profile image</button>
          </div>
        </div>
        <div className='col-md-8'>
          <div className='detail-heading'>Your Profile</div>
          <div className='details'>
            {profileData &&
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label htmlFor="patientName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="patientName" name="patientName" value={profileData.patientName} readOnly={!edit} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input className="form-control" type='email' id="email" value={profileData.email} name="email" readOnly={!edit} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dateofBirth" className="form-label">Date of Birth</label>
                  <input className="form-control" type='date' id="dateofBirth" value={profileData.dateofBirth} name="dateofBirth" readOnly={!edit} onChange={onchange} />
                </div>
                <div className="col-md-4">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select id="gender" className="form-select" value={profileData.gender} name="gender" onChange={onchange}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Others</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                  <input className="form-control" type='text' id="bloodGroup" name="bloodGroup" value={profileData.bloodGroup} readOnly={!edit} onChange={onchange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneNo" className="form-label">Contact Number</label>
                  <input className="form-control" type='Number' id="phoneNo" value={profileData.phoneNo} name="phoneNo" readOnly={!edit} onChange={onchange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="disease" className="form-label">Disease</label>
                  <input className="form-control" type='text' id="disease" name="disease" value={profileData.disease} readOnly={!edit} onChange={onchange} />
                </div>
                <div className='col-12 text-center'>
                  {!edit ? (
                    <button type="button" className="btn btn-primary" onClick={handleEditProfile}>Edit Profile</button>
                  ) : (
                    <div className="text-center">
                      <button type="submit" className="btn btn-success me-2">Save Changes</button>
                      <button type="button" className="btn btn-primary" onClick={handleCancel}>Cancel</button>
                    </div>
                  )}
                </div>
              </form>
            }
          </div>
        </div>
      </div>


    </div>
  );
};

export default PatientProfile;