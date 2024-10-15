import {CompanyRepository} from "../repositories"
import {CompanyCreateInterface} from "../common/interfaces/company.create.interface";
import {Types} from "mongoose";

class CompanyService{
	async create(company: CompanyCreateInterface){
		return CompanyRepository.create(company)
	}

	async getAll(){
		return CompanyRepository.getAll()
	}

	async getById(id: Types.ObjectId | string){
		return CompanyRepository.getById(id)
	}

	async update(id: Types.ObjectId | string, data: Partial<CompanyCreateInterface>){
		return CompanyRepository.update(id, data)
	}

	async deleteCompany(id: Types.ObjectId | string){
		return CompanyRepository.deleteCompany(id)
	}

}

export default new CompanyService()