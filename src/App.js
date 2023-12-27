import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import Login from './components/Login/Login.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer.js';
import Register from './components/Register/Register.js';
import DoctorPage from './components/Doctor/DoctorPage.js';
import PatientPage from './components/Patient/PatientPage.js';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/doctorpage" element={<DoctorPage/>} />
          <Route exact path="/patientpage" element={<PatientPage/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
