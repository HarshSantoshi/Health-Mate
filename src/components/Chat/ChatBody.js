import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import InputEmoji from "react-input-emoji"
import { VideoCall as VideoCallIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const Body = styled('div')`
  height: 100%;
  border: 1px solid black;
  width: 70%;
`;

const ChatContainer = styled('div')`
  height: 80%;
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Sent = styled('div')`
  background: blue;
  max-width: 55%;
  margin-left: auto;
  padding: 2px 5px;
  align-items: center;
  width: fit-content;
  color: white;
  display: flex;
  border-radius: 8px;
  margin-top: 10px;
  word-break: break-word;
`;

const Received = styled('div')`
  background: green;
  max-width: 55%;
  color: white;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 2px 5px;
  border-radius: 8px;
  margin-top: 10px;
  word-break: break-word;
`;



const Chat = styled(Typography)`
  font-size: 14px;
  padding: 0 18px 0 5px;
`;

const Time = styled(Typography)`
  color: white;
  font-size: 10px !important;
  margin-top: auto;
  word-break: keep-all;
`;

const Header = styled('div')`
  height: 10%;
  width: 100%;
  background-color: #e0e0e0;
  display : flex;
  align-items:center;
  justify-content : center;
`;
const InputContainer = styled('div')`
  height: 10%;
  border: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center; /* Correct property name */
  justify-content: center;
`;

const ProfileImg = styled('img')`
height:40px;
border-radius : 50%;
margin: 0 10px;
`
const Name = styled('div')`
font-weight : bold;
`
const Button = styled('button')`
  height: 80%;
  margin:0 20px;
  background-color: blue;
  color: white;
  border-radius: 10px;
`;
// const GenerateButton = styled(VideoCallIcon)`
//   position: relative;
//   &:hover {

//     &:before {
//       content: "Generate meeting id";
//       position: absolute;
//       bottom: 100%;
//       left: 10;
//       background: white;
//       padding: 5px;
//       border: 1px solid #ccc;
//       border-radius: 5px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//       z-index: 1;
//     }
//   }
// `;
const ChatBody = ({ chat , currentUserId ,currUserRole , setSendMessage , receiveMessage}) => {
  const [userData , setUserData] = useState(null);
  const [message, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const chatContainerRef = useRef();
  const navigate  = useNavigate();
  //setting header of the chat
  useEffect(()=>{
    const userId = chat?.members?.find((id)=>id!==currentUserId);
    
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
  if(chat!==null){
    getUserData();
  }
  } , [chat , currentUserId])

  //fetch messages
  useEffect(()=>{
    const fetchMessages = async()=>{
      try {
        const response = await fetch(`http://localhost:8000/api/v1/message/${chat?._id}`);
        const data = await response.json();
        // console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    }
    if(chat !== null){
      fetchMessages();
    }

  },[chat])
  

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  
const scrollToBottom = () => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && newMessage !== '') {
      e.preventDefault();
      handleSend();
    }
  };

  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const min = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}`;
  };
 
  const generateID = async()=>{
    const text = `Join my meeting  , ${chat._id}`;
    await handleSend(text);
  }
  const handleChange = (text) => {
    setnewMessage(text);
  };
  const handleJoinRoom = useCallback(()=>{
    navigate(`/meet/${chat._id}`, { state: { userID: currentUserId   } });
  },[navigate , chat])
  
  const handleSend = async (link) => {
    if(newMessage == "" && link == "")return ;
    const msg = {
      senderId: currentUserId,
      chatId: chat._id,
      text: newMessage || link
    };
    let  sentMessage;
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`);
      }
  
      sentMessage = await response.json();
      // console.log("sent message ",sentMessage);
  
      setMessages([...message, sentMessage]);
      setnewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    const receiverId = chat?.members?.find((id) => id !== currentUserId);
  
    if (receiverId) {
      setSendMessage({ ...sentMessage, receiverId: receiverId });
    }
  };
  useEffect(()=>{
    if(receiveMessage !==null && receiveMessage.chatId === chat._id){
      // console.log("receivedd messg ",receiveMessage);
      setMessages([...message , receiveMessage])
    }
  },[receiveMessage])
  
  return (
    <>
      <Body>
      {chat === null ? (
          <Typography>Select a user </Typography>
        ) : (
          <>
           <Header>
            <ProfileImg src="../profile.png" alt='banner' />
            {currUserRole === 'doctor' ? (
              <Name>
                Patient Name: {userData?.patientName}
              </Name>
            ) : (
              <Name>
                Doctor Name: {userData?.doctorName}
              </Name>
            )}
          </Header>
            <ChatContainer ref={chatContainerRef}>
              {message.map((msg, index) => (
                <>
                {msg.senderId === currentUserId ? 
                <Sent key={index}>
                <Chat>{msg.text}</Chat>
                <Time>{formatDate(msg.createdAt) || msg.date}</Time>
              </Sent>
              :
              <Received key={index}>
                <Chat>{msg.text}</Chat>
                <Time>{formatDate(msg.createdAt) || msg.createdAt}</Time>
              </Received>
                }
                </>
              ))}
            </ChatContainer>
            <InputContainer>
            {
              currUserRole === 'doctor' ? <>
              <VideoCallIcon
                sx={{
                  position: 'relative',
                  cursor:'pointer',
                  '&:hover': {
                    '&:before': {
                      content: '"Generate meeting id"',
                      position: 'absolute',
                      bottom: '100%',
                      left: '10',
                      background: 'white',
                      padding: '5px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      zIndex: 1,
                    },
                  },
                }}
                onClick = {()=>generateID()}
              />
              </> : ""
            }
            <InputEmoji 
            onChange={handleChange}
            value = {newMessage}
            onKeyDown={handleKeyPress}
            />
            <Button onClick={ handleSend}>Send</Button>
            <button onClick={handleJoinRoom}>Join</button>
            </InputContainer>
           
          </>
        )}
      </Body>
    </>
  );
};

export default ChatBody;
