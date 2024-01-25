import  { Schema, model } from 'mongoose';
const chatSchema = new Schema({
    members :{
        type:Array,
        unique: true
    }
},{timestamps:true})

const ChatModel = model("ChatModel",chatSchema);
export default ChatModel;