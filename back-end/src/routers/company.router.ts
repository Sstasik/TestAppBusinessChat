import { Router } from 'express';

import { CompanyController } from "../controllers"

import authMiddleware from "../middlwares/guards/auth.guard"
import adminMiddleware from "../middlwares/guards/admin.guard";

const companyRouter: Router = Router();

companyRouter.get('/', authMiddleware, CompanyController.getAll)

companyRouter.post('/', authMiddleware, adminMiddleware, CompanyController.create)

companyRouter.get('/:id', authMiddleware, CompanyController.getById)

companyRouter.patch('/:id', authMiddleware, adminMiddleware, CompanyController.update )

companyRouter.patch('/:id', authMiddleware, adminMiddleware, CompanyController.delete )

export default companyRouter;