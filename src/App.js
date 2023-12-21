import './App.css';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import DoctorPage from './components/Doctor/DoctorPage';
import PatientPage from './components/Patient/PatientPage';
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
