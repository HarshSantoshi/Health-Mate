import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import "./DoctorDetailPage.css"
import DoctorAbout from './DoctorAbout.js';
import DoctorFeedback from './DoctorFeedback.js';
import Footer from "../Footer/Footer.js";
import doctorcontext from '../../context/Doctor/doctorcontext.js';
const Image = styled('img')`
height : 250px;
width : 200px;
border:1px solid blue;
padding: 5px;
border-radius : 10px;
`
const Specialization = styled('div')({
  backgroundColor: '#CCF0F3',
  // width:"content",
  color: 'blue',
  padding: '2px 6px',
  textAlign:"center",
  fontWeight: '700',
  borderRadius: '4px',
});
const Content = styled('div')`
margin:10px;
max-width:500px;
text-align:left;
padding:20px;
display:flex;
flex-direction : column;
align-items:start;
height : 230px;
overflow-y: auto;
&::-webkit-scrollbar {
  width: 8px;  
}
`
const Name = styled('div')`
font-size : 25px;
font-weight : bold;
`

const StarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});
const Fee = styled('span')`

`

const TagLine = styled('div')`
font-size : 16px;
`
const Star = styled('i')`
  color: gold;
`;



const DoctorDetailPage = () => {
    const location = useLocation();
    const doctorID = location.state?.doctorID;
    const doctorInformation = location.state?.info;
    const [doctor , setDoctor] = useState({});
    const [tab , setTab] = useState("about")
    
    useEffect(()=>{
      const fetchData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/doctors/getdoctor/${doctorID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            setDoctor(json.doctor);
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
      };
      fetchData();
    },[])
  return (
    <>
    <div style={{ maxWidth:"90%" , margin:"0 auto" }}>
      <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , padding : "30px 5px"}}>
        <div>
          <Image src= "https://static.vecteezy.com/system/resources/previews/027/308/944/non_2x/doctor-with-ai-generated-free-png.png" />
        </div>
        <Content>
        <Specialization>{doctor.specialization}</Specialization>
        <Name> {doctor.doctorName} </Name>
        <StarContainer>
        <Star className="fa-solid fa-star" />

          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '16px' }}> 4.5
          </span>
          <span style={{ fontSize: '15px', color: 'grey', fontWeight: '400' }}>
            (100) 
          </span>
        </StarContainer>
        <Fee> <span style={{fontSize:"18px" , fontWeight:"600"}}>Consultation Fees </span>  : Rs {doctor.fees}/-</Fee>
        <TagLine>Empowering Health, Inspiring Life: Your Wellness Journey Starts Here</TagLine>
        </Content>

      </div>
      <hr/>

      <div style={{display:"flex" , margin:"0 100px" , borderBottom:"1px solid grey"}}>
        <button 
        onClick={()=>setTab('about')}
        className= {`${tab ==='about' && 'activetab'} btns `}
        >
          About
        </button>
        <button 
        onClick={()=>setTab('feedback')}
        className= {`${tab ==='feedback' && 'activetab'} btns `}
        >
          Feedback
        </button>
      </div>
      <div style={{marginTop:"20px"}}>
          {
            
            tab === 'about' ?  
            <DoctorAbout doctor = {doctor}/>:
            <DoctorFeedback doctor = {doctor}/>
          }
        </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default DoctorDetailPage
