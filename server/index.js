const express  = require('express');
const app= express();
var cors = require('cors')
app.use(cors())
// const connectToMongoDB = require("./db.js");
app.use(express.json());
// connectToMongoDB();

app.get('/',(req,res)=>{
    res.send("Hello World");
})


app.listen(process.env.PORT||5000,()=>{
    
})
