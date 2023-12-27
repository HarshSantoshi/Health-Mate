import {} from 'dotenv/config'
import connectToMongoDB from "./db/index.js";
// import express from "express";

// const app = express();
import { app } from './app.js';
connectToMongoDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running`)
    })
})
.catch((error) => {
    console.log("MONGO DB CONNECTION FAILED " , error);
})

app.on("error" , (error) =>{
    console.log(`Error while setting up the app : ${error}`)
})
