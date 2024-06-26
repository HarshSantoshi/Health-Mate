import React, { useContext, useEffect, useState, useRef } from 'react';
import "./doctorprofile.css"
import styled from 'styled-components';
import Footer from "../Footer/Footer.js";
import { Box } from '@mui/material';
import { Modal } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import doctorcontext from '../../context/Doctor/doctorcontext.js';
import axios from 'axios';

const CollegeName = styled('span')`
font-Weight : 600;
`
const WorkPlace = styled('span')`
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
const Hospital = styled('i')`
color:red;
`
const Role = styled('div')`
font-weight : 700;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  maxHeight: '90vh',
  overflowY: 'scroll',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '0px',
  },
};


const DoctorProfile = () => {
  const { doctor, experience, education, fetchData, updatedoctorProfile, updatedoctor, Addexp, Deleteexp, Addedu, Deleteedu } = useContext(doctorcontext);
  //Info start
  const [info, setInfo] = useState({
    doctorName: "",
    specialization: "",
    experienceYrs: "",
    currentlyserving: "",
    fees: "",
    phoneNo: "",
    about: "",
    doctorImage: ""
  });
  const presetKey = "healthmate";
  const cloud_name = "dgarsqfvl";
  const [image, setImage] = useState("profile.png");

  const [openabout, setOpenabout] = useState(false);

  const onchange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updatedoctor(info.specialization, info.experienceYrs, info.about, info.fees, info.currentlyserving, info.phoneNo);
    handleCloseabout();
  };

  const handleOpenabout = () => {
    setInfo({
      doctorName: doctor.doctorName || "",
      specialization: doctor.specialization || "",
      experienceYrs: doctor.experienceYrs || "",
      currentlyserving: doctor.currentlyserving || "",
      fees: doctor.fees || "",
      phoneNo: doctor.phoneNo || "",
      about: doctor.about || "",
      doctorImage: doctor.doctorImage || ""
    });
    setOpenabout(true);
  };

  const handleCloseabout = () => {
    setOpenabout(false);
    setInfo({
      doctorName: doctor.doctorName || "",
      specialization: doctor.specialization || "",
      experienceYrs: doctor.experienceYrs || "",
      currentlyserving: doctor.currentlyserving || "",
      fees: doctor.fees || "",
      phoneNo: doctor.phoneNo || "",
      about: doctor.about || "",
      doctorImage: doctor.doctorImage || ""
    });
  };

  //info end

  //experience start
  const ref = useRef(null);
  const [exp, setexp] = useState({
    hospital: "",
    service: "",
    startdate: "",
    enddate: ""
  });
  const handleexpchange = (e) => {
    setexp({ ...exp, [e.target.name]: e.target.value })
  }
  const handleExp = (e) => {
    e.preventDefault();
    ref.current.click();
    Addexp(exp.hospital, exp.service, handledate(exp.startdate), handledate(exp.enddate))
    setexp({ hospital: "", service: "", startdate: "", enddate: "" })
  };
  //experience end
  //education start
  const refedu = useRef(null);
  const [edu, setedu] = useState({
    institution: "",
    speciality: "",
    startdate: "",
    enddate: ""
  });
  const handleeduchange = (e) => {
    setedu({ ...edu, [e.target.name]: e.target.value })
  }
  const uploadPicture = async () => {


    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", presetKey);
    data.append("cloud_name", cloud_name)

    fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      // mode : "no-cors",
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(data => {

        updatedoctorProfile(data.url)


      })
      .catch(error => console.error("Error uploading image:", error));

  };

  const handleEdu = (e) => {
    e.preventDefault();
    refedu.current.click();
    Addedu(edu.institution, edu.speciality, handledate(edu.startdate), handledate(edu.enddate));
    setedu({ institution: "", speciality: "", startdate: "", enddate: "" })
  };
  //education end
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const handledate = (date) => {
    const [year, mon] = date.split('-');
    return month[parseInt(mon) - 1] + '-' + year;
  }
  //Modal start
  const [openexp, setOpenexp] = React.useState(false);
  const [openedu, setOpenedu] = React.useState(false);
  const handleOpenexp = () => setOpenexp(true);
  const handleCloseexp = () => {
    ref.current.click();
    setexp({ hospital: "", service: "", startdate: "", enddate: "" })
    setOpenexp(false);
  }
  const handleOpenedu = () => setOpenedu(true);
  const handleCloseedu = () => {
    refedu.current.click();
    setedu({ institution: "", speciality: "", startdate: "", enddate: "" })
    setOpenedu(false);
  }
  //Modal end

  useEffect(() => {
    // Fetch the token from localStorage
    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token) {
        const decodedToken = jwtDecode(token);
        if (role === "doctor") {
          const doctorIdFromToken = decodedToken.doctor.id;
          fetchData(doctorIdFromToken);
        }
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  }, []);
  return (
    <div className="bg">
      <div className='profile-container'>
        <div className='intro'>
          <div style={{ textAlign: "right" }} onClick={handleOpenabout}><i className="fa-solid fa-pen Add"></i></div>

          <div className='dr_image'>
            <img src={doctor.doctorImage ? doctor.doctorImage : 'profile.png'} alt="" />
          </div>
          <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}></input>
          <button className='btn btn-primary mt-3' onClick={uploadPicture}>Change profile Image</button>

          <div className='d-flex flex-wrap'>
            <div className='col-md-9 details'>
              <h3 className='name'>{doctor.doctorName}</h3>
              <p className='specialization'>{doctor.specialization}</p>
              <p className='location'>Delhi, India</p>
              <div style={{ display: 'flex', fontSize: "16px" }}>
                <p className='count'>Treatment of 500+ Patients </p>
                |
                <p style={{ margin: "0 10px" }}>
                  <Star className="fa-solid fa-star" />
                  4.5(10)</p>
              </div>
              <div style={{ fontSize: "16px" }}>
                {doctor.experienceYrs}+ years of Experience
              </div>
            </div>
            <div className='col-md-3'>
              <i className="fa-solid fa-hospital icon"></i>
              <span className='hospital'>{doctor.currentlyserving}</span>
            </div>
          </div>
        </div>
        <div className='cnt'>
          <div className='d-flex justify-content-between'>
            <h3 className='title'>About</h3>
            <div onClick={handleOpenabout}>
              <i className="fa-solid fa-pen Add"></i>
            </div>
          </div>
          <p>{doctor.about}</p>
        </div>
        <div className='cnt'>
          <div className='d-flex justify-content-between'>
            <h3 className='title'>Experience</h3>
            <div onClick={handleOpenexp}>
              <i className="fa-solid fa-plus Add"></i>
            </div>
          </div>
          {experience.length !== 0 && experience.map((exp, i) => (
            <div key={i}>
              <div style={{ display: "flex", margin: "10px 0" }}>
                <div style={{ margin: "auto 2px" }}><Hospital className="fa-solid fa-hospital icon" /></div>
                <div>
                  <WorkPlace>{exp.hospital}</WorkPlace>
                  <Role>{exp.service}</Role>
                  <Year>({exp.startdate} - {exp.enddate})</Year>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className='cnt'>
          <div className='d-flex justify-content-between'>
            <h3 className='title'>Education</h3>
            <div onClick={handleOpenedu}>
              <i className="fa-solid fa-plus Add"></i>
            </div>
          </div>
          {education.length !== 0 && education.map((edu, i) => (
            <div key={i}>
              <div style={{ display: "flex", margin: "10px 0" }}>
                <div style={{ margin: "auto 2px" }}><Hospital className="fa-solid fa-hospital icon" /></div>
                <div>
                  <WorkPlace>{edu.institution}</WorkPlace>
                  <Role>{edu.speciality}</Role>
                  <Year>({edu.startdate} - {edu.enddate})</Year>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Modal
        keepMounted
        open={openexp}
        onClose={handleCloseexp}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <i
            className="fa-solid fa-xmark close-icon"
            aria-label="close"
            onClick={handleCloseexp}
          />
          <h3 className='title-exp'>Experience</h3>
          {experience.length !== 0 && experience.map((exp, i) => (
            <div key={i}>
              <div className='d-flex justify-content-between'>
                <div className='experience-item'>
                  <Hospital className="fa-solid fa-hospital icon" />
                  <div>
                    <div className="work-place">{exp.hospital}</div>
                    <div className="role">{exp.service}</div>
                    <div className="year">({exp.startdate} - {exp.enddate})</div>
                  </div>
                </div>
                <i className="fa-solid fa-trash remove" onClick={() => Deleteexp(exp._id)}></i>
              </div>
              <hr />
            </div>
          ))}
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" ref={ref} data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  ADD
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <form className="row g-3" onSubmit={handleExp}>
                    <div className="col-md-6">
                      <label htmlFor="hospital" className="form-label">Hospital Name</label>
                      <input type="text" className="form-control" id="hospital" name="hospital" value={exp.hospital} onChange={handleexpchange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="service" className="form-label">Service</label>
                      <input className="form-control" type='text' id="service" value={exp.service} name="service" onChange={handleexpchange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="startdate" className="form-label">Started In</label>
                      <input className="form-control" type='month' id="startdate" value={exp.startdate} name="startdate" onChange={handleexpchange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="enddate" className="form-label">Complete (if pursue leave)</label>
                      <input className="form-control" type='month' id="enddate" value={exp.enddate} name="enddate" onChange={handleexpchange} required />
                    </div>
                    <div className='col-12 text-center'>
                      <button type="submit" className="btn btn-success me-2">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openedu}
        onClose={handleCloseedu}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >

        <Box sx={style}>
          <i className="fa-solid fa-xmark"
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
              fontSize: "20px",
              cursor: "pointer"
            }}
            aria-label="close"
            onClick={handleCloseedu} >
          </i>
          <h3 className='title' style={{ color: "black" }}>Education</h3>
          {education.length !== 0 && education.map((edu, i) => (
            <div key={i}>
              <div className='d-flex justify-content-between'>
                <div style={{ display: "flex", margin: "10px 0" }}>
                  <div style={{ margin: "auto 2px" }}><Hospital className="fa-solid fa-hospital icon" /></div>
                  <div>
                    <WorkPlace>{edu.institution}</WorkPlace>
                    <Role>{edu.speciality}</Role>
                    <Year>({edu.startdate} - {edu.enddate})</Year>
                  </div>
                </div>
                <div>
                  <i className="fa-solid fa-trash remove" onClick={() => Deleteedu(edu._id)}></i>
                </div>
              </div>
              <hr />
            </div>
          ))}
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" ref={refedu} data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  ADD
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <form className="row g-3" onSubmit={handleEdu}>
                    <div className="col-md-6">
                      <label htmlFor="institution" className="form-label">Institution Name</label>
                      <input type="text" className="form-control" id="institution" name="institution" value={edu.institution} onChange={handleeduchange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="speciality" className="form-label">Specilization</label>
                      <input className="form-control" type='text' id="speciality" value={edu.speciality} name="speciality" onChange={handleeduchange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="startdate" className="form-label">Started In</label>
                      <input className="form-control" type='month' id="startdate" value={edu.startdate} name="startdate" onChange={handleeduchange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="enddate" className="form-label">Complete  (if pursue leave)</label>
                      <input className="form-control" type='month' id="enddate" value={edu.enddate} name="enddate" onChange={handleeduchange} required />
                    </div>
                    <div className='col-12 text-center'>
                      <div className="text-center">
                        <button type="submit" className="btn btn-success me-2">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openabout}
        onClose={handleCloseabout}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <i className="fa-solid fa-xmark"
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
              fontSize: "20px",
              cursor: "pointer"
            }}
            aria-label="close"
            onClick={handleCloseabout} >
          </i>
          <h3 className='title' style={{ color: "black", textAlign: 'center' }}>Edit Info</h3>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="doctorName" className="form-label">Name</label>
              <input type="text" className="form-control" id="doctorName" name="doctorName" value={info.doctorName} readOnly />
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="specialization" className="form-label">Specialization</label>
              <input className="form-control" type='text' id="specialization" value={info.specialization} name="specialization" onChange={onchange} />
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="experienceYrs" className="form-label">Experience</label>
              <input className="form-control" type='Number' id="experienceYrs" value={info.experienceYrs} name="experienceYrs" onChange={onchange} />
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="currentlyserving" className="form-label">Currently Serving</label>
              <input className="form-control" type='text' id="currentlyserving" value={info.currentlyserving} name="currentlyserving" onChange={onchange} />
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="fees" className="form-label">Fees</label>
              <input className="form-control" type='Number' id="fees" value={info.fees} name="fees" onChange={onchange} />
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="phoneNo" className="form-label">Phone No</label>
              <input className="form-control" type='Number' id="phoneNo" value={info.phoneNo} name="phoneNo" onChange={onchange} />
            </div>
            <div className="col-12">
              <label htmlFor="about" className="form-label">About</label>
              <textarea className="form-control" id="about" value={info.about} name="about" rows="3" onChange={onchange}></textarea>
            </div>
            <div className='col-12 text-center'>
              <button type="submit" className="btn btn-success me-2">Save</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default DoctorProfile;