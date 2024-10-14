import { Request, Response, NextFunction } from 'express';

interface ErrorInterface extends Error {
	statusCode?: number;
}

const errorMiddleware = (err: ErrorInterface, req: Request, res: Response, next: NextFunction): void => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	console.error(`[Error] ${err.stack}`);

	res.status(statusCode).json({
		success: false,
		message
	});
};

export default errorMiddleware;
