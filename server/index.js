import {} from 'dotenv/config'
import connectToMongoDB from "./db/index.js";
import { app  , server } from './app.js';
// import DefaultData from './Defaultdata.js';

connectToMongoDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running`)
    })
})
.catch((error) => {
    console.log("MONGO DB CONNECTION FAILED " , error);
})
server.listen(8001, () => {
    console.log('server running at http://localhost:8001');
  });
app.on("error" , (error) =>{
    console.log(`Error while setting up the app : ${error}`)
})

//use to store the medicine data in the database
// DefaultData();
