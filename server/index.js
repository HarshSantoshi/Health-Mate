import {} from 'dotenv/config'
import connectToMongoDB from "./db/index.js";
import { app  , server , io} from './app.js';
connectToMongoDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running`)
    })
})
.catch((error) => {
    console.log("MONGO DB CONNECTION FAILED " , error);
})
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('joined' , ({id})=>{
        console.log(`the user with connected with ${id}`)
    })

    //for message
    socket.on('message',({msg})=>{
        io.emit('sendMessage' , {msg})
    })
    socket.on('disconnect' , ()=>{
        console.log('User left');
    })
  });
server.listen(8001, () => {
    console.log('server running at http://localhost:8001');
  });
app.on("error" , (error) =>{
    console.log(`Error while setting up the app : ${error}`)
})
