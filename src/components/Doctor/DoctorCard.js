import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const Content = styled('div')({
  marginTop: '2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Specialization = styled('div')({
  backgroundColor: '#CCF0F3',
  color: 'blue',
  padding: '2px 4px',
  fontWeight: '700',
  borderRadius: '4px',
});

const StarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

const Button = styled('button')({
  marginTop: '15px',
  backgroundColor: '#4eb54e',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
});

export default function DoctorCard({ props }) {
  const navigate = useNavigate();
  const { patientId } = props;

  const handleClicktoDoctorDetails = (id, e) => {
    e.stopPropagation(); // Stop the propagation of the click event
    navigate(`/doctordetail`, { state: { doctorID: id  , info : props , patientId : patientId} });
  };

  const handleClick = async (id, e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the propagation of the click event

    try {
      const response = await fetch('https://health-mate-server-new.vercel.app/api/v1/chat/', {
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

      // Redirect to the patient chat page
      navigate(`/chat/${patientId}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div
      style={{ padding: '5px', height: 'auto', marginBottom: '10px', margin: '20px 0px' }}
      onClick={(e) => handleClicktoDoctorDetails(props.id , e)}
      role="button"
      tabIndex="0"
    >
      <div style={{ borderRadius: '10px' }}>
        <img
          src="https://www.summit-urgentcare.com/wp-content/uploads/2014/12/Dollarphotoclub_69741928.jpg"
          alt="doctor"
          style={{ width: '300px', borderRadius: '10px' }}
        />
      </div>
      <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{props.name}</h2>
      <Content>
        <Specialization>{props.specialization}</Specialization>
        <StarContainer>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '16px' }}>
            <img src="star.png" alt="star" style={{ width: '14px' }} /> {props.rating}
          </span>
          <span style={{ fontSize: '15px', color: 'grey', fontWeight: '400' }}>
            ({props.totalRatings})
          </span>
        </StarContainer>
      </Content>
      <Button onClick={(e) => handleClick(props.id, e)}>Chat Now</Button>
    </div>
  );
}
