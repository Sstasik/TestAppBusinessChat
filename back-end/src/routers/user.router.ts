import { Router } from 'express';

import { UserController } from "../controllers"

import authMiddleware from "../middlwares/guards/auth.guard"
import adminMiddleware from "../middlwares/guards/admin.guard";

const userRouter: Router = Router();

userRouter.get('/', UserController.getAll)

userRouter.get('/:id', authMiddleware, UserController.getById)

userRouter.get('setPremium/:id', authMiddleware, adminMiddleware, UserController.setUserPremiumAccount)

userRouter.get('setPremium/:id', authMiddleware, adminMiddleware, UserController.setUserNotPremiumAccount)

export default userRouter;