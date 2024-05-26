import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatBody from './ChatBody.js';
import { useParams } from 'react-router-dom';
import Conversation from '../Conversation/Conversation.js';
import { io } from 'socket.io-client';
const Container = styled.div`
  height: 88.5vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 5px 8px;
  overflow-y: auto;
  display: none;
  flex-direction: column;
  align-items: center;
  width: 98%;
  height: 98%;
  background: #f6f6f7;
  border-radius: 10px;
  margin: auto auto;
  margin-top: 14px;
  &::-webkit-scrollbar {
    width: 0px;
  }

  @media screen and (min-width: 768px) {
    width: 25%;
    display: flex;
  }
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
  background-color: ${({ isSelected }) => (isSelected ? '#a5cbf0' : '#fff')};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #a5cbf0;
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
  const socket = useRef();
  useEffect(() => {
    if (sendMessage !== null) {
      console.log("message send")
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current = io('http://localhost:8800');

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

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(`https://health-mate-server-new.vercel.app/api/v1/chat/${id}`);
        const data = await response.json();
        setConversations(data)
      } catch (error) {
        console.log(error);
      }
    }
    getChats();
    // console.log(conversation);
    // console.log(currChat);
  }, []);



  return (
    <>
      <Container>
        <LeftContainer>
          <h4 style={{ textAlign: "left" }}>Your Chats </h4>
          {conversation.map((chat, index) => (
            <UserContainer key={index} onClick={() => {setCurrChat(chat); setSelected(index)}} isSelected={selected === index} >
              <Conversation data={chat} currentUserId={id} currUserRole={localStorage.getItem('role')} />
            </UserContainer>
          ))}
        </LeftContainer>
        <ChatBody chat={currChat} currentUserId={id} currUserRole={localStorage.getItem('role')} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
      </Container>
    </>
  );
};

export default ChatSection;
