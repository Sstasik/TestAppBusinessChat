import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {RoleEnum} from "../../common/enums/role.enum";
import {UserPayload} from "../../common/interfaces/user.payload.interface";
import {ErrorInterface} from "../../common/interfaces/error.interface";

const superAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		const error: ErrorInterface = new Error('No token provided, authorization denied');
		error.statusCode = 401;
		return next(error);
	}

	jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
		if (err || !decoded) {
			const error: ErrorInterface = new Error('Token is not valid');
			error.statusCode = 401;
			return next(error);
		}

		const user = decoded as UserPayload;

		if (user.role !== RoleEnum.SUPER_ADMIN) {
			const error: ErrorInterface = new Error('Permission denied');
			error.statusCode = 403;
			return next(error);
		}
		req.user = user
		next();
	});
};

export default superAdminMiddleware;