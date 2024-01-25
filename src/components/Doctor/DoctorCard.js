import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import {styled} from '@mui/system';


const Content = styled('div')({
  marginTop: '2',
  display: 'flex',
  alignItems:'center',
  justifyContent: 'space-between',
});
const Specialization = styled('div')({
  backgroundColor:'#CCF0F3',
  color:'blue',
  padding:'2px 4px',
  fontWeight:'700',
  borderRadius:'4px'
})
const StarContainer = styled('div')({
  display:'flex' , 
  alignItems:'center',
  gap:'5px'
})
const Button = styled('button')({
  marginTop:'15px',
  backgroundColor:'#4eb54e',
  color:'white',
  borderRadius:'10px',

})

export default function DoctorCard({props}) {
  const navigate = useNavigate();
  const {patientId} = props;
  const handleClick = async(id) =>{
    //chat create
    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: patientId,
          receiverId: id,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create chat: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    //redirect to patient chat page
    navigate(`/chat/${patientId}`);
  }
  return (
    <div style={{padding:"5px", height:'auto' , marginBottom:'10px', margin:'20px 0px'}}>
      <div>
        <img src="https://www.summit-urgentcare.com/wp-content/uploads/2014/12/Dollarphotoclub_69741928.jpg" alt='doctor' style={{width:"300px"}}/>
      </div>
      <h2 style={{fontSize : "18px" , fontWeight:"700"}}>
        {props.name}
      </h2>
      <Content>
        <Specialization>
          {props.specialization}
        </Specialization>
        <StarContainer>
          <span style={{display:'flex', alignItems:'center' , gap:'5px' , fontSize:'16px' }}>
            <img src='star.png' alt='star' style={{width:'14px'}} /> {props.rating}
          </span>
          <span style={{fontSize:'15px' , color:'grey' , fontWeight:'400'}}>
            ({props.totalRatings})
          </span>
        </StarContainer>

      </Content>
      <Button onClick={()=>handleClick(props.id)}>
          Schedule a meeting
      </Button>

    </div>
  );
}