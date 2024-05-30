import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatBody from './ChatBody.js';
import { useParams } from 'react-router-dom';
import Conversation from '../Conversation/Conversation.js';
import { io } from 'socket.io-client';
import './chat.css'
const Container = styled.div`
  height: 88.5vh;
  width: 100%;
  display: flex;
`;



const UserContainer = styled(({ isSelected, ...rest }) => <div {...rest} />)`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin: 5px 0;
  border-radius: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#e2e8f0' : '#fff')};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f8fafc;
  }
`;

const ChatSection = () => {

  const { id } = useParams();
  const [conversation, setConversations] = useState([]);
  const [currChat, setCurrChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [selected, setSelected] = useState(-1);
  const [isActive, setisActive] = useState(false);
  const socket = useRef();
  
  useEffect(() => {
    if (sendMessage !== null) {
      
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current = io('https://health-mate-socket.vercel.app/');

    socket.current.emit("new-user-add", id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    })
  }, [id])

  useEffect(() => {

    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    })
  }, [])
  const funcToMakeisActivefalse = ()=>{
    setisActive(false);
  }
  const funcToMakeChatnull = ()=>{
    setCurrChat(null);

  }

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(`https://health-mate-server.vercel.app/api/v1/chat/${id}`);
        const data = await response.json();
        setConversations(data)
      } catch (error) {
        console.error(error)
      }
    }
    getChats();
    
  }, []);



  return (
    <>
      <Container>
        <div className='leftcontainer'>
          <h4 style={{ textAlign: "left" }}>Your Chats </h4>
          {conversation.map((chat, index) => (
            <UserContainer key={index} onClick={() => {setCurrChat(chat); setSelected(index) ; setisActive(true)}} isSelected={selected === index} >
              <Conversation data={chat} currentUserId={id} currUserRole={localStorage.getItem('role')} />
            </UserContainer>
          ))}
        </div>
        <ChatBody isActive funcToMakeChatnull={funcToMakeChatnull} funcToMakeisActivefalse = {funcToMakeisActivefalse} setisActive= {setisActive}  chat={currChat} currentUserId={id} currUserRole={localStorage.getItem('role')} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
      </Container>
    </>
  );
};

export default ChatSection;
