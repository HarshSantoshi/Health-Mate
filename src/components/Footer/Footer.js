import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='section'>
            <h4>HealthMate</h4>
            <p>About</p>
            <p>Blog</p>
            <p>Careers</p>
            <p>Press</p>
            <p>Contact Us</p>
        </div>
        <div className='section'>
            <h4>For patients</h4>
            <p>Search for doctors</p>
            <p>Search for clinics</p>
            <p>Search for hospitals</p>
            <p>Book Diagnostic Tests</p>
            <p>Book Full Body Checkups</p>
           
        </div>
        <div className='section' >
            <h4>For doctors</h4>
            <p>HealthMate Profile</p>
            <h4>For clinics</h4>
            <p>Ray by HealthMate</p>
            <p>HealthMate Reach</p>
            <p>HealthMate Pro</p>
        </div>
        <div className='section' >
            <h4>For Hospitals</h4>
            <p>Insta by HealthMate</p>
            <p>Qikwell by HealthMate</p>
            <p>HealthMate Profile</p>
            <p>HealthMate Reach</p>
            <p>HealthMate Drive</p>
        </div>
        <div className='section'>
            <h4>Social</h4>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>LinkedIn</p>
            <p>Youtube</p>
            <p>Github</p>
        </div>
    </div>
    </>
  );
};

export default Footer;
