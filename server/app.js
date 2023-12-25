import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express()

app.use(cors());

app.use(json());
app.use(urlencoded())
app.use(express.static("public"))
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use("/api/auth",require("./routes/auth.js"));

export const module =  app;