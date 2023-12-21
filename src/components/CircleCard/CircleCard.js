import React from 'react'
import './CircleCard.css'
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
        <div className = "consult">
            Consult Now
        </div>
    </div>
    
    </>
  )
}

export default CircleCard
