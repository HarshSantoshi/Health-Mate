import React from 'react';
import "./doctorprofile.css"

const DoctorProfile = () => {
  return (
    <>
      <div className='profile-container'>
        <div className='intro'>
          <div className='dr_image'>
            <img src='profile.png' alt="" />
          </div>
          <div className='d-flex flex-wrap'>
            <div className='col-md-9 details'>
              <h3 className='name'>Harsh</h3>
              <p className='specialization'>Neurologist</p>
              <p className='location'>Delhi, India</p>
              <p className='count'>Treatment of 500+ Patients</p>
            </div>
            <div className='col-md-3'>
              <i className="fa-solid fa-hospital icon"></i>
              <span className='hospital'>Delhi Technological University</span>
            </div>
          </div>
        </div>
        <div className='cnt'>
            <h3 className='title'>About</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab alias qui at nisi nostrum dolorum neque! Cum non beatae ipsa?</p>
        </div>
        <div className='cnt'>
            <h3 className='title'>Services</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab alias qui at nisi nostrum dolorum neque! Cum non beatae ipsa?</p>
        </div>
        <div className='cnt'>
            <h3 className='title'>Education</h3>
            <span>MBBS</span>
            <hr />
        </div>
        <div className='cnt'>
            <h3 className='title'>Experience</h3>
            <div className='work'>
                <p className='workat'>Worked At</p> 
                <span>AIIMS Delhi</span><span>2 years</span>
            </div>
        </div>
        <div className='cnt'>
            <h3 className='title'>Information</h3>
            <div className='info'>
              <p>Rating</p>
              <span>4.5(100)</span>
            </div>
        </div>
      </div>
    </>
  )
}

export default DoctorProfile;
