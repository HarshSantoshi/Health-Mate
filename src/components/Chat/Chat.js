import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Message from '../Message/Message.js';
import './chat.css';
import ReactScrollToBottom from "react-scroll-to-bottom"
const ENDPOINT = 'http://localhost:8001/';

let socket;

const Chat = () => {
  const [msg, setMsg] = useState('');
  const [messages , setMessages] = useState(["This is a meesage" , "second message"]);
  const { id } = useParams();

  const send = () => {
    socket.emit('message', { msg });
    setMessages([...messages , msg]);
    setMsg('');
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      alert('connected');
    });

    socket.emit('joined', { id });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [id]); 
  useEffect(() => {
    
    socket.on('sendMessage', (message) => {
      // setMessages([...messages , message.msg])
      console.log(message.msg);
      console.log(messages)
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'>
          Welcome to the Chat
        </div>
        <ReactScrollToBottom className='chatBox'>
          {
            messages.map((item , i)=><Message message={item}/>)
          }
        </ReactScrollToBottom>
        <div className='inputBox'>
          <input
            type='text'
            id='chatInput'
            value={msg} 
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button className='sendBtn' onClick={send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
