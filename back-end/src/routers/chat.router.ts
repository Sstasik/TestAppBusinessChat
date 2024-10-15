import { Router } from 'express';

import  ChatController from "../controllers/chat.controller"
import authMiddleware from "../middlwares/guards/auth.guard";

const chatRouter: Router = Router();

chatRouter.post('/', authMiddleware, ChatController.sendMessage)

export default chatRouter;