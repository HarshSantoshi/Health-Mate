import React, { useEffect,  useState } from 'react'
import styled from 'styled-components';
const Container = styled('div')`
 display : flex;
 align-items:center;
`;
const ProfileImg = styled('img')`
height:40px;
width:40px;
border-radius : 50%;
margin: 0 10px;
`

const Conversation = ({data , currentUserId , currUserRole}) => {
    const [userData , setUserData] = useState(null);
    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId)

        const getUserData = async()=>{
            try {
                let response;
                if(currUserRole === "doctor"){
                    response = await fetch(`https://health-mate-server.vercel.app/api/v1/patient/getpatient/${userId}`);
                    const data = await response.json();
                    setUserData(data.patient);
                }
                else if(currUserRole === 'patient'){
                    response = await fetch(`https://health-mate-server.vercel.app/api/v1/doctors/getdoctor/${userId}`);
                    const data = await response.json();
                    setUserData(data.doctor);
                }
            } catch (error) {
              console.error(error)
            }
        }
        getUserData();
    },[currentUserId])
  return (
    
    <Container>
        <ProfileImg src={ currUserRole == 'doctor'? (userData?.patientImage ?userData?.patientImage :"../profile.png"  ) :(userData?.doctorImage ? userData?.doctorImage :"../profile.png"  ) } alt='banner' />
        {currUserRole === 'doctor' ? (
            <span style={{width:"80%",display:"grid" }}>
            <span style={{ display:'block', fontSize:"16px" , fontWeight:"600"  , textAlign:'left'}}>
            {userData?.patientName}
            </span>
            
          </span>
            ) : (
              <span style={{width:"80%",display:"grid" }}>
              <span style={{ display:'block', fontSize:"16px" , fontWeight:"600"  , textAlign:'left'}}>
              {userData?.doctorName}
              </span>
              
            </span>
            )}
    </Container>
  )
}

export default Conversation
