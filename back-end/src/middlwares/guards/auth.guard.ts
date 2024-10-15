import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {ErrorInterface} from "../../common/interfaces/error.interface";
import {UserPayload} from "../../common/interfaces/user.payload.interface";

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload | null;
		}
	}
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
		req.user = decoded as UserPayload;
		next();
	});
};

export default authMiddleware;
