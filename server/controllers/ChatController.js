import ChatModel from "../models/chatSchema.js";

export const createChat = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const existingChat = await ChatModel.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (existingChat) {

            return res.status(200).json(existingChat);
        }
        const newChat = new ChatModel({
            members: [senderId, receiverId]
        });

        const result = await newChat.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const userChats=async(req,res)=>{
    try {
        const chat = await ChatModel.find({
            members:{$in : [req.params.id]}
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error)
    }
}
export const findChat = async(req,res)=>{
    try {
        const chat = await ChatModel.findOne({
            members :{$all : [req.params.firstId , req.params.secondId]}
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
        
    }
}