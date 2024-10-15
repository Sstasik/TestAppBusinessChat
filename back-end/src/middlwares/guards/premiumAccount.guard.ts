import { Request, Response, NextFunction } from 'express';
import { UserService } from "../../services"
import {UserPayload} from "../../common/interfaces/user.payload.interface";
import {ErrorInterface} from "../../common/interfaces/error.interface";

const premiumAccountMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const userPayload = req.user as UserPayload;
	const user = await UserService.getById(userPayload.id)
	if (!user.isPremium) {
		const error: ErrorInterface = new Error('Permission denied. You have not premium account');
		error.statusCode = 403;
		return next(error);
	}
	next();
};

export default premiumAccountMiddleware;