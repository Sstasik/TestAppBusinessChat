import { Request, Response, NextFunction } from 'express';
import { CompanyService } from "../../services"
import {UserPayload} from "../../common/interfaces/user.payload.interface";
import {ErrorInterface} from "../../common/interfaces/error.interface";

const companyAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
		const user = req.user as UserPayload;
		const companyId = req.params.id || req.params.companyId
		const company = await CompanyService.getById(companyId)
		if (user.id != company.admin) {
			const error: ErrorInterface = new Error('Permission denied. You are not admin of this company');
			error.statusCode = 403;
			return next(error);
		}
		next();
};

export default companyAdminMiddleware;