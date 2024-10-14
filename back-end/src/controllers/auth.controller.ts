import {NextFunction, Request, Response} from 'express';
import { AuthService } from "../services"

class AuthController{
	async registration(req: Request, res: Response, next: NextFunction){
		try {
			const user = await AuthService.registration(req.body)
			res.status(201).json(user)
		}catch (e) {
			next(e)
		}
	}

	async login(req: Request, res: Response, next: NextFunction){
		try {
			const {email, password} = req.body
			const user = await AuthService.login(email, password)
			res.status(200).json(user)
		}catch (e) {
			next(e)
		}
	}
}

export default new AuthController()