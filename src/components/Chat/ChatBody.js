import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

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
  padding: 5px;
  width: fit-content;
  display: flex;
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
  background-color: grey;
  color:white;
`;
const InputContainer = styled('div')`
  height: 10%;
  border: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center; /* Correct property name */
  justify-content: center;
`;

const TypeField = styled('input')`
  color: #d1d7db;
  width: 80%;
  height: 90%;
  margin: auto 20px;
  font-size: 16px;
  padding: 0 10px;
  color: black;
  overflow-x: scroll;
`;

const Button = styled('button')`
  height: 90%;
  background-color: #2a3942;
  color: white;
  border-radius: 5px;
`;
const ChatBody = ({ name }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  
const scrollToBottom = () => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && message !== '') {
      e.preventDefault();
      console.log(message);
      handleSend();
    }
    
  };

  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const min = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}`;
  };

  const handleSend = () => {

    const newMessage = {
      content: message,
      createdAt: new Date(),
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
  };

  return (
    <>
      <Body>
      {name === "" ? (
          <Typography>Select a Patient</Typography>
        ) : (
          <>
            <Header>Patient Name: {name}</Header>
            <ChatContainer ref={chatContainerRef}>
              {chatMessages.map((msg, index) => (
                <Sent key={index}>
                  <Chat>{msg.content}</Chat>
                  <Time>{formatDate(msg.createdAt)}</Time>
                </Sent>
              ))}
            </ChatContainer>
            <InputContainer>
              <TypeField
                type="text"
                placeholder="Type a message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyUp={handleKeyPress}
              />
              <Button onClick={ handleSend}>Send</Button>
              
            </InputContainer>
          </>
        )}
      </Body>
    </>
  );
};

export default ChatBody;
