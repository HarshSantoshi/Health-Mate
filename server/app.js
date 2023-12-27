import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());

//Routes
import { docRouter } from './routes/doctor.routes.js';

//routes declarations
app.use("/api/v1/doctors"  , docRouter);

export {app};