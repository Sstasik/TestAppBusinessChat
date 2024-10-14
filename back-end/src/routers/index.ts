import {Router} from "express"

import authRouter from "./auth.router"

const routers: Router = Router();

routers.use('/auth', authRouter)

export default routers