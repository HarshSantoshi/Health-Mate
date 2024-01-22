import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatBody from './ChatBody.js';
import { useParams } from 'react-router-dom';


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
  background-color: ${(props) => (props.index % 2 === 0 ? '#e0e0e0' : '#f0f0f0')};
  cursor: pointer; /* Add cursor style to indicate it's clickable */
`;
const ChatSection = () => {
  const users = ['Patient Name 1', 'Patient Name 2', 'Patient Name 3', 4, 2, 'feawf', 2, 'feawf', 2, 'feawf', 2, 'feawf', 2, 'feawf', 2, 'feawf'];
  const [user, setUser] = useState("");
  const {id} = useParams();

  const handleUserClick = (selectedUser) => {
    setUser(selectedUser);
  };

  return (
    <>
      <Container>
        <LeftContainer>
          Your Chats
          {users.map((userName, index) => (
            <UserContainer key={index} index={index} onClick={() => handleUserClick(userName)}>
              {userName}
            </UserContainer>
          ))}
        </LeftContainer>
        <ChatBody name={user} />
      </Container>
    </>
  );
};

export default ChatSection;
