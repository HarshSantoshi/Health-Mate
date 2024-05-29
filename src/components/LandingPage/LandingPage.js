import React, { useEffect, useState } from 'react'
import ServicesCard from '../ServicesCard/ServicesCard.js'
import CircleCard from '../CircleCard/CircleCard.js'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer.js'
import { jwtDecode } from 'jwt-decode'
import {  useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      const decodedToken = jwtDecode(token);
      
      if(role === "doctor"){
        const doctorIdFromToken = decodedToken.doctor.id;

        setDoctorId(doctorIdFromToken);
        
      }
      else{
        const patientIdFromToken = decodedToken.patient.id;
        setPatientId(patientIdFromToken);
      }
    }
  }, []);
  return (
    
    <>
      {/* <div className='bannerImg'>
        <img src="landingimage.jpg" alt='banner' />
      </div> */}

      {/* <div className='bannerText' >
        <div className='Heading'>
          Get rid from your Diseases with a single touch
        </div>
        <div className="features">
          <button type="button" className="btn btn-success"> Doctors</button>
          <button type="button" className="btn btn-primary">Lab Test</button>
        </div>
        <div className="try">Register Today and get 15% off on your first service</div>
        <button type="button" className="btn btn-success"> Register</button>
      </div> */}
      <div className='hero-image' >
        <div className='hero-content'>
          <div className='hero-content-inner'>
            <h2>Get rid from your Diseases with a single touch</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui, atque! Asperiores explicabo eligendi sunt, enim tenetur excepturi temporibus voluptatem cupiditate!</p>
            <button type='button' onClick={()=>{
              if(!localStorage.getItem('token')){
                navigate('/login');
              }else{
                navigate('/alldoctorspage');
              }
            }}>Book Appointment</button>
          </div>
        </div>
      </div>
      <div className="heading">
        Our Services
      </div>
      <div className='cards'>
        <Link className="text-decoration" to='/alldoctorspage'>
          <ServicesCard feature="Video Call" text="Connect within 60 seconds" img="videocall-img.png" />
        </Link>
        <Link className="text-decoration" to={`/bookings`}><ServicesCard feature="My Booking" text="Confirmed appointments with doctors" img="finddoctor-img1.jpg"  /></Link>
        <Link className="text-decoration" to='/allmedicinepage' state={{patientId : patientId}}>
        <ServicesCard feature="Medicines" text="Essentials at your doorstep" img="medicines-img.jpg" />
        </Link>
        <ServicesCard feature="Lab Test" text="Sample pickup at your home" img="labtest-img.jpeg" />
        <ServicesCard feature="Surgeries" text="Safe and trusted surgery centers" img="surjeries-img.jpg" />
      </div>

      <div className="heading">
        Consult top doctors online for any health concern
      </div>
      <div className="sub-heading">
        Private online consultations with verified doctors in all specialists
      </div>

      <div className="cards">
        <CircleCard disease="Acne , Pimples and skin disorders" img="acne-img.jpg" />
        <CircleCard disease="Cold , Cough or Fever" img="cough-img.jpg" />
        <CircleCard disease="Child not felling Well?" img="chlid-img.jpg" />
        <CircleCard disease="Depression or Anxiety " img="depression-img" />
        <CircleCard disease="Pregnancy or Period Diorders" img="pregnency-img.jpg" />

      </div>
      <hr />

      <div className="heading">
        What our users have to say
      </div>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <div className="testimony" >
              Very good app. Well thought about booking/rescheduling/canceling an appointment.Doctor's feedback is good and describes all the basics.
            </div>
            <div className='author'>
              ~ Ashutosh
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className="testimony" >
              Very easy to book,maintain history. Hassle free from older versions of booking appointment via telephone.. Thanks Practo for making it simple.
            </div>
            <div className='author'>
              ~ Harsh Santoshi
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className="testimony" >
              Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking. Even maintains history of doctors visited.   </div>
              <div className='author'>
              ~ Abhinav
            </div>
          </div>
          
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" ></span>
          <span >Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next" >
          <span className="carousel-control-next-icon" ></span>
          <span>Next</span>
        </button>
      </div>
      <Footer/>

    </>

  )
}

export default LandingPage
