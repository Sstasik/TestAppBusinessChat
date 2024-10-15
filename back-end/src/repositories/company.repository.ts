import {CompanyModel, UserModel} from "../models";
import {CompanyCreateInterface} from "../common/interfaces/company.create.interface";
import {Types} from "mongoose";


class CompanyRepository{
	async create(data: CompanyCreateInterface){
		try {
			return CompanyModel.create(data)
		}catch (e) {
			throw new Error(`Server error: ${e}`)
		}
	}

	async getAll(){
		return CompanyModel.find()
	}

	async getById(id: Types.ObjectId | string){
		try {
			const company = await CompanyModel.findById(id); // Exclude password
			if (!company) {
				throw new Error('Company not found');
			}
			return company;
		} catch (error) {
			throw new Error('Error fetching company by ID: ' + error);
		}
	}

	async update(id: string | Types.ObjectId, data: Partial<CompanyCreateInterface>) {
		try {
			const company = await CompanyModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
			if (!company) {
				throw new Error(`Company with id ${id} not found`);
			}
			return company;
		} catch (e) {
			throw new Error(`Server error: ${e}`);
		}
	}

	async deleteCompany(id: string | Types.ObjectId) {
		try {
			const result = await CompanyModel.findByIdAndDelete(id);
			if (!result) {
				throw new Error(`Company with id ${id} not found`);
			}
			return { message: 'Company successfully deleted', result };
		} catch (e) {
			throw new Error(`Server error: ${e}`);
		}
	}

}

export default new CompanyRepository()