import React from 'react'
import "./RightSide.css"
import Updates from '../Updates/Updates.js';
import Review from '../Review/Review.js';

function RightSide() {
  return (
    <div className="RightSide">
      <div>
        <h3 style={{textAlign:"center"}}>Feedbacks</h3>
        <Updates />
      </div>
      <div>
        <h3 style={{textAlign:"center"}}>Review</h3>
        <Review />
      </div>
    </div>
  )
}

export default RightSide
