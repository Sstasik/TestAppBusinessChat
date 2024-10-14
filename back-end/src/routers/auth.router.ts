import { Router } from 'express';

import { AuthController } from "../controllers/index"

const authRouter: Router = Router();

authRouter.post('/registration', AuthController.registration)

authRouter.post('/login', AuthController.login)

export default authRouter;