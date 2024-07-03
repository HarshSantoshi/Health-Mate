import React, { useEffect, useState } from 'react'
import "./Cards.css"
import Card from '../Card/Card.js'
import { Person, CurrencyRupee,Chat} from '@mui/icons-material';
import { fetchId } from '../../../Data/Id.js';

function Cards() {
  const [count , setCount] = useState(0);
  const [chatcount , setChatCount] = useState(0);
  const cardsData = [
    {
        title: "Appointments",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: count,
        png: Person
    },
    {
        title: "Earnings",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: count*200,
        png: CurrencyRupee
    },
    {
        title: "Chats",
        color: {
            backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: chatcount,
        png: Chat
    },
];
const fetchAppointments = async () => {
    try {
        const response = await fetch(`https://health-mate-server.vercel.app/api/v1/appointment/getallappointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        setCount(data?.appointments.length);
    } catch (error) {
        console.error(error)
    } 
};
const id = fetchId();
useEffect(() => {
  const getChats = async () => {
    try {
      const response = await fetch(`https://health-mate-server.vercel.app/api/v1/chat/${id}`);
      const data = await response.json();
      setChatCount(data.length)
    } catch (error) {
      console.error(error)
    }
  }
  getChats();
  
}, []);
useEffect(() => {
  const fetchData = async () => {
    await fetchAppointments();
  };
  fetchData();
}, []);
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  )
}

export default Cards
