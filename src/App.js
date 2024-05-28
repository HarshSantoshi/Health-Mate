import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import Login from './components/Login/Login.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import DoctorDash from './components/Doctor/Dashboard/MainDash.js'
import CartState from './context/cart/Cartstate.js';
import DoctorState from './context/Doctor/DoctorState.js';
import Bookings from './components/Patient/Bookings.js';
import Error404 from './Pages/Error/Error404.js';
import Protected from './utils/ProctectedRoutes.js';

function App() {
  const role = localStorage.getItem('role')
  return (
    <div className="App">
      <Toaster position="top-center"
        toastOptions={{
          success: {
            theme: {
              primary: "green"
            }
          },
          error: {
            theme: {
              primary: "red"
            }
          }
        }} />
      <DoctorState>
        <CartState>
          <Router>
            <Navbar />
            <Routes>
            <Route exact path="/" element=
            {
            role == "patient" ?
            <LandingPage/>
            :
            (role == "doctor"?
            <DoctorDash/>
            :
            <Error404/>
          )
            } />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/error" element={<Error404 />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/dashboard" element={ <Protected role="doctor">
                    <DoctorDash />
                  </Protected>
                }
              />
             
              <Route exact path="/patientpage" element={<Protected role="patient">
                <PatientPage />
              </Protected>} />
              <Route exact path="/patientprofile" element={<Protected role = "patient">
                    <PatientProfile />
                  </Protected>} />
              <Route exact path="/doctorprofile" element={<Protected role = "doctor">
                    <DoctorProfile />
                  </Protected>} />
              <Route exact path="/alldoctorspage" element={<Protected role = "patient">
                    <DoctorPage />
                  </Protected>} />
              <Route exact path="/doctordetail" element={<Protected role = "patient">
                    <DoctorDetailPage />
                  </Protected>}  />
              <Route exact path="/chat/:id" element={<Protected role = "">
                    <ChatSection />
                  </Protected>}  />
              <Route exact path="/allmedicinepage" element={<Protected role = "patient">
                    <MedicineMain />
                  </Protected>}  />
              <Route exact path="/product/:id" element={<Protected role = "patient">
                    <Productmain />
                  </Protected>} />
              <Route exact path="/cart" element={<Protected role = "patient">
                    <Cart />
                  </Protected>}/>
              <Route exact path="/meet/:id" element={<Protected role = "">
                    <Meet />
                  </Protected>} />
              <Route exact path="/bookings" element={<Protected role = "patient">
                    <Bookings />
                  </Protected>} />
            </Routes>
            {/* <Footer/> */}
          </Router>
        </CartState>
      </DoctorState>
    </div>
  );
}

export default App;
