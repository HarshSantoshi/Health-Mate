import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import Login from './components/Login/Login.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer.js';
import Register from './components/Register/Register.js';
import DoctorPage from './components/Doctor/DoctorPage.js';
import PatientPage from './components/Patient/PatientPage.js';
import { Toaster } from 'react-hot-toast';
import PatientProfile from './components/Patient/PatientProfile.js';
import DoctorProfile from './components/Doctor/DoctorProfile.js';
import ChatSection from './components/Chat/ChatSection.js';
import MedicineMain from './components/Medicine/MedicineMain.js';
import Productmain from './components/Medicine/Product/Productmain.js';
import Cart from './components/Medicine/Cart/Cart.js';
import Meet from './components/Meeting/Meet.js';
import DoctorDetailPage from './components/Doctor/DoctorDetailPage.js';
import CartState from './context/cart/Cartstate.js';
import DoctorState from './context/Doctor/DoctorState.js';
function App() {

  return (
    <div className="App">
      <Toaster position="top-center"
        toastOptions={{
          success:{
            theme:{
              primary: "green"
            }
          },
          error :{
            theme :{
              primary : "red"
            }
          }
        }}/>
        <DoctorState>
        <CartState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/doctorpage" element={<DoctorPage/>} />
          <Route exact path="/patientpage" element={<PatientPage/>} />
          <Route exact path="/patientprofile" element={<PatientProfile/>} />
          <Route exact path="/doctorprofile" element={<DoctorProfile/>} />
          <Route exact path="/alldoctorspage" element={<DoctorPage/>} />
          <Route exact path="/doctordetail" element={<DoctorDetailPage/>} />
          <Route exact path="/chat/:id" element={<ChatSection/>} />
          <Route exact path="/allmedicinepage" element={<MedicineMain/>} />
          <Route exact path="/product/:id" element={<Productmain/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/meet/:meetId" element={<Meet/>} />
        </Routes>
        {/* <Footer/> */}
      </Router>
      </CartState>
        </DoctorState>
    </div>
  );
}

export default App;
