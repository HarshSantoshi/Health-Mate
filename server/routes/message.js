import { Router } from "express";
import { addMessage , getMessage } from "../controllers/MessageController.js";
const MessageRouter = Router();
MessageRouter.post('/' , addMessage);
MessageRouter.get('/:chatId' , getMessage);
export default MessageRouter;