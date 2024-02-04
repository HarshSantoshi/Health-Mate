import React from 'react'
import "./MainDash.css"
import Dash from './Dash/Dash.js'
import RightSide from './RightSide/RightSide.js'

function MainDash() {
  return (
    <div className="MainDash">
      <div className="MainDashGlass">
        <Dash />
        <RightSide />
      </div>
    </div>
  )
}

export default MainDash
