import React from 'react'
import './CircleCard.css'
import { Link } from "react-router-dom"
const CircleCard = ({img , disease}) => {
  return (
    <>
    <div className='container'>
        <div className="image">
            <img src = {img} alt = "ada"/>
        </div>
        <div className = "disease">
            {disease} 
        </div>
        <Link className = "consult text-decoration" to='/alldoctorspage'>
            Consult Now
        </Link>
    </div>
    
    </>
  )
}

export default CircleCard
