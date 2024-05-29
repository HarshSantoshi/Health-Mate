import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import "./DoctorDetailPage.css"
import DoctorAbout from './DoctorAbout.js';
import DoctorFeedback from './DoctorFeedback.js';
import Footer from "../Footer/Footer.js";
import { Box } from '@mui/material';
import { Modal } from '@mui/material';
import { useTheme } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import toast from 'react-hot-toast';
import { paymenthandler } from '../Payment/Payment.js'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  '12:00-12:15',
  '12:15-12:30',
  '12:30-12:45',
  '12:45-13:00',
  '13:00-13:15',
  '13:15-13:30',
  '13:30-13:45',
  '13:45-14:00',
  '14:00-14:15',
  '14:15-14:30',
  '14:30-14:45',
  '14:45-15:00'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}
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
  textAlign: "center",
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
// overflow-y: auto;
// &::-webkit-scrollbar {
//   width: 8px;  
// }
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: '70%',
  overflow: 'scroll',
  backgroundColor: 'background.paper',
  borderRadius: '15px',
  // border: '2px solid #000',
  // boxShadow: '24px', 
  '&::-webkit-scrollbar': {
    width: '0px',
  },
  p: '16px',
};


const DoctorDetailPage = () => {
  const location = useLocation();
  const doctorID = location.state?.doctorID;
  const patientID = location.state?.patientId;
  const doctorInformation = location.state?.info;
  const [doctor, setDoctor] = useState({});
  const [tab, setTab] = useState("about")
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [minDate, setMinDate] = useState('');
  const theme = useTheme();
  const [personName, setPersonName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [available , setAvailable] = useState(false);

  const handleChange = (event) => {
    setPersonName(event.target.value);
    
  };
  
  const handleBook = async (e) => {
    e.preventDefault();
    try {
        const paymentCompleted = await paymenthandler(doctor.fees*100);
        if (paymentCompleted) {
            const response = await fetch(`https://health-mate-server.vercel.app/api/v1/patient/bookappointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: selectedDate,
                    starttime: personName.substring(0, 5),
                    endtime: personName.substring(personName.length - 5),
                    doctorId: doctorID,
                    patientId: patientID,
                    status: "approved"
                })
            });

            const json = await response.json();
           
            if (json.success) {
                toast.success("Appointment Booked");
            }
            setAvailable(false);
        } else {
            
        }
    } catch (error) {
        console.error('Error while booking:', error);
    }
}

  const handleCheck = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`https://health-mate-server.vercel.app/api/v1/patient/checkavailability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:  JSON.stringify({
          date: selectedDate,
          starttime:personName.substring(0, 5), 
          endtime: personName.substring(personName.length - 5),
          doctorId: doctorID,
          status : "approved"
        })
        
      });
      const json = await response.json();
      
      if(json.success === true){
        toast.success("Slot is available!");
        setAvailable(true);
      }
      else if(json.success === false){
        toast.error("Slot is not available!");
      }
      
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    }
  }
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(`https://health-mate-server.vercel.app/api/v1/doctors/getdoctor/${doctorID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const json = await response.json();
        setDoctor(json.doctor);
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchData();
  }, [])
  return (
    <>
      <div style={{ maxWidth: "90%", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "30px 5px" ,flexWrap:"wrap"}}>
          <div>
            <Image src={doctor.doctorImage? doctor.doctorImage : "https://static.vecteezy.com/system/resources/previews/027/308/944/non_2x/doctor-with-ai-generated-free-png.png"} />
          </div>
          <Content>
            <Specialization>{doctor?.specialization}</Specialization>
            <Name> {doctor?.doctorName} </Name>
            <StarContainer>
              <Star className="fa-solid fa-star" />

              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '16px' }}> 4.5
              </span>
              <span style={{ fontSize: '15px', color: 'grey', fontWeight: '400' }}>
                (100)
              </span>
            </StarContainer>
            <Fee> <span style={{ fontSize: "18px", fontWeight: "600" }}>Consultation Fees </span>  : Rs {doctor?.fees}/-</Fee>
            <button type="button" className="btn btn-outline-dark my-2" onClick={handleOpen}>Book Appointment</button>
            <TagLine>Empowering Health, Inspiring Life: Your Wellness Journey Starts Here</TagLine>
          </Content>

        </div>
        <hr />

        <div style={{ display: "flex", margin: "0 100px", borderBottom: "1px solid grey" }}>
          <button
            onClick={() => setTab('about')}
            className={`${tab === 'about' && 'activetab'} btns `}
          >
            About
          </button>
          <button
            onClick={() => setTab('feedback')}
            className={`${tab === 'feedback' && 'activetab'} btns `}
          >
            Feedback
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          {

            tab === 'about' ?
              <DoctorAbout doctor={doctor} /> :
              <DoctorFeedback doctor={doctor} />
          }
        </div>

      </div>
      <Footer />
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h3 className='title' style={{ color: "black" }}>Book Appointment</h3>
          <div className='col-md-6 appointment'>
            <form className="row g-3 ">
              <div className="col-12">
                <h3 style={{textAlign:"center"}}>{doctor?.doctorName}</h3>
              </div>
              <div className="col-12">
                <label htmlFor="date" className="form-label">Select Date</label>
                <input type="Date" className="form-control" id="date" name="date" min={minDate}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <FormControl sx={{ my: 2, width: 400 }}>
                  <InputLabel id="demo-single-name-label">Slot</InputLabel>
                  <Select
                    labelId="demo-single-name-label"
                    id="demo-single-name"
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='col-12 text-center'>
                <div className="text-center">
                  {
                    available?
                    <button type="submit" className="btn btn-success me-2" onClick={handleBook}>Book Now</button>
                    :
                    <button type="submit" className="btn btn-success me-2" onClick={handleCheck}>Check Availaibity</button>
                  }
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default DoctorDetailPage
