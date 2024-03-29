import React, { useEffect,  useState } from 'react'
import styled from 'styled-components';
const Container = styled('div')`
 display : flex;
 align-items:center;
`;
const ProfileImg = styled('img')`
height:40px;
border-radius : 50%;
margin: 0 10px;
`
const Name = styled('div')`
font-weight : bold;
`
const Conversation = ({data , currentUserId , currUserRole}) => {
    const [userData , setUserData] = useState(null);
    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId)

        const getUserData = async()=>{
            try {
                let response;
                if(currUserRole === "doctor"){
                    response = await fetch(`http://localhost:8000/api/v1/patient/getpatient/${userId}`);
                    const data = await response.json();
                    setUserData(data.patient);
                }
                else if(currUserRole === 'patient'){
                    response = await fetch(`http://localhost:8000/api/v1/doctors/getdoctor/${userId}`);
                    const data = await response.json();
                    setUserData(data.doctor);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    },[currentUserId])
  return (
    
    <Container>
        <ProfileImg src="../profile.png" alt='banner' />
        {currUserRole === 'doctor' ? (
              <Name>
                {userData?.patientName}
              </Name>
            ) : (
              <Name>
                {userData?.doctorName}
              </Name>
            )}
    </Container>
  )
}

export default Conversation
