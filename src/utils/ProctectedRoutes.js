import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ role , children }) {
    const userRole = localStorage.getItem('role')
  if (!userRole) {
    return <Navigate to="/login" replace />
  }
  else if(role != userRole && role != ""){
    if(role == 'doctor')
    return <Navigate to = "/error" replace />
  }
  return children
}
export default Protected