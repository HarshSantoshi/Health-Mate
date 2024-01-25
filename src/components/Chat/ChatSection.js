import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatBody from './ChatBody.js';
import { useParams } from 'react-router-dom';
import Conversation from '../Conversation/Conversation.js';
import { io } from 'socket.io-client';
const Container = styled('div')`
  height: 90vh;
  width: 100%;
  border: 1px solid black;
  display: flex;
`;

const LeftContainer = styled('div')`
  height: 100%;
  border: 1px solid black;
  width: 30%;
  padding: 5px 3px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const UserContainer = styled('div')`
  height: 10%;
  width: 100%;
  display : flex;
  background-color: #f0f0f0;
  cursor: pointer;
  margin:10px 0px;
  border-radius : 10px;
  &:hover {
    border: 2px solid #3498db;
    background-color:#e0e0e0 ;
  }


`;
const ChatSection = () => {
  
  const {id} = useParams();
  const [conversation , setConversations] = useState([]);
  const [currChat , setCurrChat] = useState(null);
  const [onlineUsers , setOnlineUsers ] = useState([]);
  const [sendMessage , setSendMessage] = useState(null);
  const [receiveMessage , setReceiveMessage] = useState(null);
  const socket = useRef();
  useEffect(()=>{
    if(sendMessage!==null){
      console.log("message send")
      socket.current.emit('send-message' , sendMessage);
    }
  },[sendMessage])

  useEffect(()=>{
    socket.current = io('http://localhost:8800');

    socket.current.emit("new-user-add" , id);
    socket.current.on('get-users' , (users)=>{
      setOnlineUsers(users);
    })
  } , [id])
  
  useEffect(()=>{
    socket.current.on("receive-message" , (data)=>{
      setReceiveMessage(data);
    })
  },[])

  useEffect(()=>{
    const getChats = async()=>{
      try {
        const response = await fetch(`http://localhost:8000/api/v1/chat/${id}`);
        const data = await response.json();
        setConversations(data)
      } catch (error) {
        console.log(error);
      }
    }
    getChats();
    console.log(conversation);
    console.log(currChat);
  } ,[]);



  return (
    <>
      <Container>
        <LeftContainer>
          <h2>Your Chats </h2>
          {conversation.map((chat, index) => (
            <UserContainer key={index} onClick={()=>setCurrChat(chat)} >
              <Conversation data = {chat} currentUserId={id} currUserRole = {localStorage.getItem('role')}/>
            </UserContainer>
          ))}
        </LeftContainer>
        <ChatBody chat = {currChat} currentUserId = {id}  currUserRole = {localStorage.getItem('role')} setSendMessage = {setSendMessage} receiveMessage = {receiveMessage}/>
      </Container>
    </>
  );
};

export default ChatSection;
