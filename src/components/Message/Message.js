import React from 'react'
import './Message.css'
const Message = ({message}) => {
  return (
    <>
    <div className='messageBox left '>
      {message} 
    </div>
    <div className='messageBox right '>
    {message} 
  </div>
  </>
  )
}

export default Message
