import { Router } from 'express';
import { createChat, findChat, userChats } from '../controllers/ChatController.js';

const ChatRouter = Router();
ChatRouter.post("/" , createChat)
ChatRouter.get("/:id" , userChats)
ChatRouter.get("/find/:firstId/:secondId" ,findChat )
export default ChatRouter