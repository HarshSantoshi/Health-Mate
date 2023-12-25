import { connect } from 'mongoose';
const uri = process.env.MONGODB_URI;
const connectDB = async()=>{
  try{
    const connectionInstance = await connect(uri);
    console.log(`MONGODB CONNECTED SUCCESSFULLY  DB HOST :${connectionInstance.connection.host}`);
  }
  catch(error){
    console.log("MONODB CONNECTION FAILED " , error);
    throw error;
  }
}
export default  connectDB;