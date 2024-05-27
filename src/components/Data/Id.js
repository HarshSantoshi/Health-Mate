import { jwtDecode } from 'jwt-decode';

export const fetchId = ()=>{
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken);
      if (role === "doctor") {
        const doctorIdFromToken = decodedToken.doctor.id;
        // console.log(doctorIdFromToken);
        return doctorIdFromToken;
      }
      else if (role === "patient") {
        const patientIdFromToken = decodedToken.patient.id;
        // console.log(patientIdFromToken);
        return patientIdFromToken;
      }
    }
}