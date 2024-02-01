import React from 'react';
import "./doctorprofile.css"
import styled from 'styled-components';
import Footer from "../Footer/Footer.js"
const CollegeName = styled('span')`
font-Weight : 600;
`
const WorkPlace = styled('span') `
font-Weight : 600;
`
const Degree = styled('div')`
font-size : 14px;
color : grey;
`
const Year = styled('div')`
font-size : 14px;
color:grey
`
const Star = styled('i')`
  color: gold;
  margin-right : 5px;
`;
const Hospital = styled('i') `
color:red;
`
const Role = styled('div')`
font-weight : 700;
`



const DoctorProfile = () => {
  return (
    <div className="bg">
      <div className='profile-container'>
        <div className='intro'>
          <div className='dr_image'>
            <img src='profile.png' alt="" />
            <button className='btn btn-primary mt-3'>Change profile Image</button>
          </div>
          <div className='d-flex flex-wrap'>
            <div className='col-md-9 details'>
              <h3 className='name'>Harsh</h3>
              <p className='specialization'>Neurologist</p>
              <p className='location'>Delhi, India</p>
              <div style={{display:'flex' , fontSize:"16px"}}>
              <p className='count'>Treatment of 500+ Patients </p>
              |
              <p style={{margin:"0 10px" }}>
              <Star className="fa-solid fa-star" />
               4.5(10)</p>
              </div>
              <div style={{fontSize : "16px"}}>
                10+ years of Experience
              </div>
            </div>
            <div className='col-md-3'>
              <i className="fa-solid fa-hospital icon"></i>
              <span className='hospital'>Delhi Technological University</span>
            </div>
          </div>
        </div>
        <div className='cnt'>
          <h3 className='title'>About</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab alias qui at nisi nostrum dolorum neque! Cum non be fwiej fhaioe eij qo ejqf dkn kagj eafhua fe fjfue fajke biuf bjibf jbfejk aeuhga kj dug qihwif q hrieh wf sihf a fuhga jghuire gwuefhqiohf nj dvia hefe gioah gknjvka jkfka v ih ef wehfoihef ohefjafgafeh ewh qnjn qfatae ipsa?</p>
        </div>
        <div className='cnt'>
          <h3 className='title'>Experience</h3>
          <div style={{ display: "flex" ,margin:"10px 0" }}>
            <div style={{ margin: "auto 2px" }}><Hospital className="fa-solid fa-hospital icon" /></div>
            <div>
              <WorkPlace>Grand Oak Hospital</WorkPlace>
              <Role>Surgeon</Role>
              <Year>(Dec 2000 - Present)</Year>
            </div>
          </div>
          <hr/>
          <div style={{ display: "flex" ,margin:"10px 0" }}>
            <div style={{ margin: "auto 2px" }}><Hospital className="fa-solid fa-hospital icon" /></div>
            <div>
              <WorkPlace>Grand Oak Hospital</WorkPlace>
              <Role>Surgeon</Role>
              <Year>(Dec 2000 - Present)</Year>
            </div>
          </div>
        </div>
        <div className='cnt'>
          <h3 className='title'>Education</h3>
          <div style={{ display: "flex" ,margin:"10px 0" }}>
            <div style={{ margin: "auto 2px" }}><Hospital className="fa-solid fa-hospital icon" /></div>
            <div>
              <CollegeName>AIIMS Delhi</CollegeName>
              <Degree>MBBS</Degree>
              <Year>(Dec 2000 - Jul 2005)</Year>
            </div>
           
          </div>
          <hr/>
          <div style={{ display: "flex" }}>
            <div style={{ margin: "auto 2px" }}><Hospital className="fa-solid fa-hospital icon" /></div>
            <div>
              <CollegeName>AIIMS Delhi</CollegeName>
              <Degree>MBBS</Degree>
              <Year>(Dec 2000 - Jul 2005)</Year>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default DoctorProfile;
