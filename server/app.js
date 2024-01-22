import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/auth.js';
import DoctorRouter from './routes/doctors.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/doctors', DoctorRouter);

export { app, server, io };
