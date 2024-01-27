import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/auth.js';
import DoctorRouter from './routes/doctors.js';
import ChatRouter from './routes/chat.js';
import MessageRouter from './routes/message.js';
import { createServer } from 'http';
import PatientRouter from './routes/patient.js';
import MedicineRouter from './routes/medicine.js';
import CartRouter from './routes/cart.js';

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/doctors', DoctorRouter);
app.use('/api/v1/patient', PatientRouter);
app.use('/api/v1/chat' , ChatRouter);
app.use('/api/v1/message' , MessageRouter);
app.use('/api/v1/medicine',MedicineRouter);
app.use('/api/v1/cart',CartRouter);

export { app, server };
