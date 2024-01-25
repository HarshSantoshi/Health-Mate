import  { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    chatId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    }
},
    { timestamps: true }
)
const MessageModel = model("MessageModel" , MessageSchema)
export default MessageModel;