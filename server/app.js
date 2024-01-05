import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Authrouter from './routes/auth.js';
import DoctorRouter from './routes/doctors.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', Authrouter);
app.use('/api/v1/doctors', DoctorRouter);

export { app };
