import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import InputEmoji from "react-input-emoji"
import { VideoCall as VideoCallIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import "./ChatBody.css"
const Body = styled('div')`
  height: 100%;
  width: 70%;
  @media screen and (max-width: 768px) {
    display:none;
  }
`;

const ChatContainer = styled('div')`
  height: 80%;
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
  background: #006496;
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
  color: #fff;
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
  margin-right: 3px;
  word-break: keep-all;
`;

const Header = styled('div')`
  height: 10%;
  width: 98%;
  background-color: #f6f6f7;
  display : flex;
  align-items:center;
  margin-top: 5px;
  border-radius:8px;
  // justify-content : center;
`;
const InputContainer = styled('div')`
  height: 10%;
  // border: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center; 
  justify-content: center;
  margin:0 5px;
  overflow:"hidden"
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
  height: 40px;
  width: auto;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items:center;
  font-size: 16px;
  margin: 4px 0;
  margin-right:10px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  
  &:hover {
    background-color: #45a049;
  }
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
const ChatBody = ({ chat, currentUserId, currUserRole, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const chatContainerRef = useRef();

  const navigate = useNavigate();
  //setting header of the chat
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        let response;
        if (currUserRole === "doctor") {

          response = await fetch(`https://health-mate-server.vercel.app/api/v1/patient/getpatient/${userId}`);
          const data = await response.json();
          setUserData(data.patient);
        }
        else if (currUserRole === 'patient') {
          response = await fetch(`https://health-mate-server.vercel.app/api/v1/doctors/getdoctor/${userId}`);
          const data = await response.json();
          setUserData(data.doctor);
          console.log(data);
        }
      } catch (error) {
        console.error(error)
      }

    }
    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUserId])

  //fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://health-mate-server.vercel.app/api/v1/message/${chat?._id}`);
        const data = await response.json();

        setMessages(data);
      } catch (error) {
        console.error(error)
      }
    }
    if (chat !== null) {
      fetchMessages();
    }

  }, [chat])


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

  const generateID = async () => {
    const text = `Join my meeting  , ${chat._id}`;
    await handleSend(text);
  }
  const handleChange = (text) => {
    setnewMessage(text);
  };
  const handleJoinRoom = useCallback(() => {
    navigate(`/meet/${chat._id}`, { state: { userID: currentUserId } });
  }, [navigate, chat])

  const handleSend = async (link) => {
    if (newMessage == "" || link == "") {
      return;
    }
    const msg = {
      senderId: currentUserId,
      chatId: chat._id,
      text: newMessage || link
    };
    let sentMessage;

    try {
      const response = await fetch('https://health-mate-server.vercel.app/api/v1/message/', {
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
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {

      setMessages([...message, receiveMessage])
    }
  }, [receiveMessage])

  return (
    <>
      <Body >
        <div className='maincon'>
          {chat === null ? (

            <>
              <div className='selectchat'>
                <img src="../chat.jpg" alt="" className='img-con' style={{ height: "100%", width: "100%" }} />
                <Typography style={{ fontSize: "20px" }}>Select a user </Typography>
              </div>
            </>
          ) : (
            <>
              <Header>
                <ProfileImg src={currUserRole == 'doctor' ? (userData?.patientImage ? userData?.patientImage : "../profile.png") : (userData?.doctorImage ? userData?.doctorImage : "../profile.png")} alt='banner' />
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
                  <React.Fragment key={index}>
                    {msg.senderId === currentUserId ? (
                      <Sent>
                        <Chat>{msg.text}</Chat>
                        <Time>{formatDate(msg.createdAt) || msg.date}</Time>
                      </Sent>
                    ) : (
                      <Received key={index}>
                        <Chat>{msg.text}</Chat>
                        <Time>{formatDate(msg.createdAt) || msg.createdAt}</Time>
                      </Received>
                    )}
                  </React.Fragment>
                ))}
              </ChatContainer>
              <InputContainer>
                {
                  currUserRole === 'doctor' ? <>
                    <VideoCallIcon
                      sx={{
                        position: 'relative',
                        cursor: 'pointer',
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
                      onClick={() => generateID()}
                    />
                  </> : ""
                }
                <InputEmoji
                  onChange={handleChange}
                  value={newMessage}
                  onKeyDown={handleKeyPress}
                  className="react-emoji"
                />
                <Button onClick={handleSend}><i className="fa-regular fa-paper-plane"></i></Button>
                <Button onClick={handleJoinRoom}>Join</Button>
              </InputContainer>

            </>
          )}
        </div>
      </Body>
    </>
  );
};

export default ChatBody;
